import { sanityClient } from "../configs/sanity";
import { User } from "../types";

const findUser = async (id: string): Promise<User | null> => {
  const users: User[] = await sanityClient.fetch(
    `*[_type == "user" && _id == "${id}"]`
  );
  return users.length > 0 ? users[0] : null;
};

export default {
  findUser,
};
