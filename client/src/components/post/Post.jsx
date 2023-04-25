import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";

import "./post.scss";

export default function Post({ post, token }) {
  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      console.log(res.data);
    };
    getUser();
  }, []);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="post__wrapper">
        <div className="post__top">
          <div className="post__top__left">
            <img
              src={user.profileAvatar || PF + "no-avatar.webp"}
              alt="profile__img"
              className="post__top__left__profile__img"
            />
            <span className="post__top__left__profile__name">
              {user.username}
            </span>
            <span className="post__top__left__date">
              {format(post.createdAt)}
            </span>
          </div>
          <div className="post__top__right">
            <MoreVertIcon />
          </div>
        </div>
        <div className="post__center">
          <span className="post__center__text">{post.desc}</span>
          <img src="" alt="postImg" className="post__center__img" />
        </div>
        <div className="post__bottom">
          <div className="post__bottom__left">
            <ThumbUpIcon className="post__bottom__left__img" />
            <FavoriteIcon
              onClick={likeHandler}
              htmlColor="red"
              className="post__bottom__left__img"
            />
            <span className="post__like__counter">{like} people like it</span>
          </div>
          <div className="post__bottom__right">
            <span className="post__bottom__right__comment">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
