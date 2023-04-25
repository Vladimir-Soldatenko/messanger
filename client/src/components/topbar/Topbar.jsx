import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

import "./topbar.scss";

export default function Topbar({ user }) {
  return (
    <div className="topbar__container">
      <div className="topbar__left">
        <Link to="/">
          <span className="topbar__logo">Social</span>
        </Link>
      </div>
      <div className="topbar__center">
        <div className="searchbar">
          <SearchIcon className="searchbar__icon" />
          <input
            type="text"
            className="searchbar__input"
            placeholder="Search for friend, post or videos"
          />
        </div>
      </div>
      <div className="topbar__right">
        <div className="topbar__links">
          <Link to="/">
            {" "}
            <span className="topbar__link">Homepage</span>{" "}
          </Link>
          <span className="topbar__link">Timeline</span>
        </div>
        <div className="topbar__icons">
          <div className="topbar__icons__item">
            <PersonIcon />
            <span className="topbar__icons__badge">1</span>
          </div>
          <div className="topbar__icons__item">
            <ChatIcon />
            <span className="topbar__icons__badge">2</span>
          </div>
          <div className="topbar__icons__item">
            <NotificationsIcon />
            <span className="topbar__icons__badge">1</span>
          </div>
        </div>
        <Link to="/profile">
          <img
            src="https://images.pexels.com/photos/14589717/pexels-photo-14589717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="profile__img"
            className="topbar__img"
          />
        </Link>
      </div>
    </div>
  );
}
