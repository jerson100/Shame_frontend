import {
  Comment,
  CreateCommentProps,
  CreatePinProps,
  EImageType,
  Pin,
  Save,
  User,
} from "../types";
import { sanityClient } from "../configs/sanity";
import { v4 as uuid } from "uuid";
import { SanityImageAssetDocument } from "@sanity/client";

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
          user,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            user,
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
        postedBy->{
            _id, user, image
        },
        save[]{
            _key,
            postedBy->{
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
      save[]{
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

const save = async (pinId: string, userId: string): Promise<Save | null> => {
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
    return {
      userId: userId,
      postedBy: {
        _id: userId,
        _type: "user",
        user: "",
        image: "",
      },
    };
  } catch (e) {
    return null;
  }
};

const remove = async (pinId: string): Promise<boolean> => {
  try {
    await sanityClient.delete(pinId);
    return true;
  } catch (e) {
    return false;
  }
};

const uploadImage = async (
  selectedFile: File,
  type: EImageType,
  name: string
): Promise<SanityImageAssetDocument> => {
  const document = await sanityClient.assets.upload("image", selectedFile, {
    contentType: type,
    filename: name,
  });
  return document;
};

const createPin = async (pin: CreatePinProps): Promise<void> => {
  await sanityClient.create(pin);
};

const findMoreInfo = async (pinId: string): Promise<Pin | null> => {
  const query = `*[_type == 'pin' && _id == '${pinId}']{
        image{
            asset->{
                url
            }
        },
        _id,
        title,
        destination,
        category,
        about,
        postedBy -> {
            _id, user, image
        },
        save[]{
            _key,
            postedBy -> {
                _id, user, image
            }
        },
        comments[]{
            _key,
            comment,
            postedBy -> {
                _id, user, image
            }
        }
    }`;
  const response = await sanityClient.fetch(query);
  return response?.length > 0 ? response[0] : null;
};

const createComment = async ({
  pinId,
  comment,
  user,
}: CreateCommentProps): Promise<Comment> => {
  const newComment = {
    comment,
    _key: uuid(),
    postedBy: { _type: "postedBy", _ref: user._id },
  };
  const c = await sanityClient
    .patch(pinId)
    .setIfMissing({ comments: [] })
    .insert("after", "comments[-1]", [newComment])
    .commit();
  console.log(c);
  return {
    ...newComment,
    postedBy: {
      _id: user._id,
      user: user.user,
      image: user.image,
    },
  };
};

export default {
  findALL,
  findALLByCategory,
  search,
  save,
  remove,
  uploadImage,
  createPin,
  findMoreInfo,
  createComment,
};
