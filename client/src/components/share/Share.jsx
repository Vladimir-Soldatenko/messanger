import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import NearMeIcon from "@mui/icons-material/NearMe";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import "./share.scss";

export default function Share() {
  return (
    <div className="share">
      <div className="share__wrapper">
        <div className="share__top">
          <img
            src="https://images.pexels.com/photos/14589717/pexels-photo-14589717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="photo"
            className="share__top__profile__img"
          />
          <input
            placeholder="What's in your mind?"
            type="text"
            className="share__top__input"
          />
        </div>
        <hr className="share__hr" />
        <div className="share__bottom">
          <div className="share__bottom__options">
            <PermMediaIcon
              htmlColor="tomato"
              className="share__bottom__options__icon"
            />
            <span className="share__bottom__options__text">Photo or Video</span>
          </div>
          <div className="share__bottom__options">
            <LabelIcon
              htmlColor="blue"
              className="share__bottom__options__icon"
            />
            <span className="share__bottom__options__text">Tag</span>
          </div>
          <div className="share__bottom__options">
            <NearMeIcon
              htmlColor="green"
              className="share__bottom__options__icon"
            />
            <span className="share__bottom__options__text">Location</span>
          </div>
          <div className="share__bottom__options">
            <EmojiEmotionsIcon
              htmlColor="goldenrod"
              className="share__bottom__options__icon"
            />
            <span className="share__bottom__options__text">Feelings</span>
          </div>
          <div className="share__btn">Share</div>
        </div>
      </div>
    </div>
  );
}
