import { categories } from "./configs/categories";

export type CategoriesType = [{ name: string; image: string }];

export interface User {
  _id: string;
  _type?: "user" | "postedBy";
  user: string;
  image: string;
}

export interface AuthContext {
  user: User | null;
  isLogged: boolean;
  token: string | null;
  login: (user: User, token: string) => Promise<boolean>;
  logout: () => void;
  loadingPrev: boolean;
}

export interface Pin extends PostUs {
  _id: string;
  _type: "pin";
  title: string;
  about: string;
  destination: string;
  category: string;
  image: {
    asset: {
      url: string;
    };
  };
  comments?: Comment[];
  save: Save[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePinProps {
  _type: string;
  title: string;
  about: string;
  destination: string;
  image: {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string;
    };
  };
  userId: string;
  postedBy: {
    _type: "postedBy";
    _ref: string;
  };
  category: CategoryType;
}

interface PostUs {
  postedBy: User;
  userId: string;
}

export interface Save extends PostUs {}

export interface Comment extends Pick<PostUs, "postedBy"> {
  comment: string;
  _key: string;
}

export interface PinProps extends Omit<Pin, "_type" | "comments"> {
  savePin: (pinId: string, userId: string) => Promise<Save | null>;
  deletePin: (pinId: string) => Promise<boolean>;
}

export enum EImageType {
  SVG = "image/svg",
  PNG = "image/png",
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  GIF = "image/gif",
  WEBP = "image/webp",
  TIFF = "image/tiff",
}

export type ImageType = keyof typeof EImageType;

export type CategoryType = (typeof categories)[number]["name"];

export interface CreateCommentProps {
  pinId: string;
  comment: string;
  user: User;
}
