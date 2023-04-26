import { Pin } from "../types";
import { sanityClient } from "../configs/sanity";
import { v4 as uuid } from "uuid";

const findALL = async (signal?: AbortSignal): Promise<Pin[]> => {
  const query = `*[_type == "pin"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        destination,
        about,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;
  const s = signal ? { signal } : {};
  const response = await sanityClient.fetch(query, undefined, s);
  return response;
};

const findALLByCategory = async (
  txt: string,
  signal?: AbortSignal
): Promise<Pin[]> => {
  const query = `*[_type == "pin" && category match '${txt}*']{
    image{
        asset->{
            url
        }
    },
    _id,
    destination,
    about,
    category,
    postedBy -> {
        _id, user, image
    },
    comments[] -> {
        _key,
        postedBy -> {
            _id, user, image
        }
    },
    save[] -> {
        _key,
        postedBy -> {
            _id, user, image
        }
    }
  }`;
  const s = signal ? { signal } : {};
  const response = await sanityClient.fetch(query, undefined, s);
  return response;
};

const search = async (txt: string, signal?: AbortSignal): Promise<Pin[]> => {
  const query = `*[_type == "pin" && (title match '${txt}*' || category match '${txt}*' || about match '${txt}*')]{
      image{
          asset->{
              url
          }
      },
      _id,
      destination,
      category,
      about,
      postedBy -> {
          _id, user, image
      },
      save[] -> {
          _key,
          postedBy -> {
              _id, user, image
          }
      }
    }`;
  const s = signal ? { signal } : {};
  const response = await sanityClient.fetch(query, undefined, s);
  return response;
};

const save = async (pinId: string, userId: string): Promise<boolean> => {
  try {
    const response = await sanityClient
      .patch(pinId)
      .setIfMissing({ save: [] })
      .insert("after", "save[-1]", [
        {
          _key: uuid(),
          userId: userId,
          postedBy: {
            _type: "postedBy",
            _ref: userId,
          },
        },
      ])
      .commit();
    console.log(response);
    return true;
  } catch (e) {
    return false;
  }
};

const remove = async (pinId: string): Promise<boolean> => {
  try {
    const response = await sanityClient.delete(pinId);
    console.log(response);
    return true;
  } catch (e) {
    return false;
  }
};

export default { findALL, findALLByCategory, search, save, remove };
