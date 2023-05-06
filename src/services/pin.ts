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

interface useGetPinsQueryProps {
  searchText?: string;
  category?: string;
  idUser?: string;
  saved?: boolean;
}

const findALL = async (
  query: useGetPinsQueryProps,
  signal?: AbortSignal
): Promise<Pin[]> => {
  const { searchText, category, idUser, saved } = query;

  const opstionsArray: string[] = [];
  const _txt = searchText
    ? `title match '${searchText}*' || about match '${searchText}*'`
    : "";
  const _c = category ? `category match '${category}*'` : "";
  const _u =
    saved && idUser
      ? `'${idUser}' in save[].postedBy._ref`
      : idUser
      ? `postedBy._ref == '${idUser}'`
      : "";

  if (_txt) opstionsArray.push(_txt);
  if (_c) opstionsArray.push(_c);
  if (_u) opstionsArray.push(_u);

  const _query = `*[_type == 'pin'${
    opstionsArray.length > 0 ? `&& (${opstionsArray.join(" && ")})` : ""
  }]`;

  const full_query = `${_query}{
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
  const response = await sanityClient.fetch(full_query, undefined, s);
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
  save,
  remove,
  uploadImage,
  createPin,
  findMoreInfo,
  createComment,
};
