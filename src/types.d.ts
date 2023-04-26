export interface User {
  _id: string;
  _type: "user";
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
  comments: Comment[];
  save: Save[] | null;
  createdAt: string;
  updatedAt: string;
}

interface PostUs {
  postedBy: User;
  userId: string;
}

export interface Save extends PostUs {}

export interface Comment extends Pick<PostUs, "postedBy"> {
  comment: string;
}

export interface PinProps extends Omit<Pin, "_type" | "comments"> {
  savePin: (pinId: string, userId: string) => Promise<Save | null>;
  deletePin: (pinId: string) => Promise<boolean>;
}
