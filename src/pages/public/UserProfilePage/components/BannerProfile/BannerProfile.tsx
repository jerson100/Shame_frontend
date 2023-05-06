import { User } from "../../../../../types";
import { Link } from "react-router-dom";

const BannerProfile = ({
  _id,
  user,
  image,
}: Pick<User, "image" | "user" | "_id">) => {
  //generate random image 1600 * 800 narute
  const imagebg = `https://source.unsplash.com/1600x800/?nature,water`;
  return (
    <div>
      <div className="h-72 -m-4">
        <img
          src={imagebg}
          alt={"background"}
          className="w-full h-full object-cover"
        />
      </div>
      <img
        src={image}
        alt={user}
        className="w-32 h-32 rounded-full -mt-16 object-cover shadow-xl ml-auto mr-auto mb-4"
      />
      <h1 className="font-bold text-2xl text-center mt-3">
        <Link to={`/profile/${_id}/`}>{user}</Link>
      </h1>
    </div>
  );
};

export default BannerProfile;
