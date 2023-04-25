import { useEffect, useState } from "react";
import api from "../../api/api";
import "./conversations.scss";

export default function Conversetions({ conversation }) {
  const [user, setUser] = useState();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const friendId = conversation?.members.find((c) => c !== currentUser._id);
    const getFriend = async () => {
      try {
        const res = await api.user.getUserByUserId(friendId);
        setUser(res);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    getFriend();
  }, []);

  if (user) {
    return (
      <div className="conversation">
        <img
          src={user?.profileAvatar || PF + "/no-avatar.webp"}
          alt="img"
          className="conversation__img"
        />
        <span className="conversation__name">{user?.username}</span>
      </div>
    );
  }
}
