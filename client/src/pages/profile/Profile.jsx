import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import api from "../../api/api";

import "./profile.scss";

export default function Profile() {
  const [user, setUser] = useState();
  const id = useParams().username;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      const user = await api.user.getUser(id);
      setUser(user);
    };

    getUser();
  }, []);

  return (
    <>
      <Topbar user={user} />
      <div className="profile">
        <Sidebar />
        <div className="profile__right">
          <div className="profile__right__top">
            <img
              src={user.coverPicture || PF + "noCover.jpg"}
              alt="img"
              className="profile__background__img"
            />
            <img
              src={user.noAvatar || PF + "no-avatar.webp"}
              alt="img"
              className="profile__user__img"
            />
          </div>
          <div className="profile__info">
            <h4 className="profile__info__username">{user.username}</h4>
            <p className="profile__info__desc">{user.desc}</p>
          </div>
          <div className="profile__right__bottom">
            <Feed user={user} />
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
}
