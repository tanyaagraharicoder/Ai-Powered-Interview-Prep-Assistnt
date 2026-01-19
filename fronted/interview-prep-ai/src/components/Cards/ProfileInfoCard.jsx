import React from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = UserContext(UserContext);

  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    <div className="">
      <img src={user.profileImageUrl} alt="" className="" />

      <div>
        <div className="">{user.name || ""}</div>
        <button className="" onClick={handlelogout}> Logout</button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
