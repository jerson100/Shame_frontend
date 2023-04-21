import React from "react";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const { idUser } = useParams();
  return <div>idUser: {idUser}</div>;
};

export default UserProfilePage;
