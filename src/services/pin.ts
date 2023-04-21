import { Pin } from "../types";
import { sanityClient } from "../configs/sanity";

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

export default { findALL, findALLByCategory, search };
