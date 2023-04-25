import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EventIcon from "@mui/icons-material/Event";

import "./sidebar.scss";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <ul className="sidebar__list">
          <li className="sidebar__list__item">
            <RssFeedIcon className="sidebar__list__item__icon" />
            <span className="sidebar__list__item__text">Feed</span>
          </li>
          <li className="sidebar__list__item">
            <ChatIcon className="sidebar__list__item__icon" />
            <span className="sidebar__list__item__text">Chat</span>
          </li>
          <li className="sidebar__list__item">
            <OndemandVideoIcon className="sidebar__list__item__icon" />
            <span className="sidebar__list__item__text">Videos</span>
          </li>
          <li className="sidebar__list__item">
            <GroupsIcon className="sidebar__list__item__icon" />
            <span className="sidebar__list__item__text">Groups</span>
          </li>
          <li className="sidebar__list__item">
            <BookmarkIcon className="sidebar__list__item__icon" />
            <span className="sidebar__list__item__text">Bookmarks</span>
          </li>
          <li className="sidebar__list__item">
            <EventIcon className="sidebar__list__item__icon" />
            <span className="sidebar__list__item__text">Events</span>
          </li>
        </ul>
        <button className="sidebar__btn">Show more</button>
        <hr className="sidebar__hr" />
        <ul className="sidebar__friends__list">
          <li className="sidebar__friends__list__item">
            <img
              src="https://images.pexels.com/photos/5044316/pexels-photo-5044316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="friend__img"
              className="sidebar__friends__list__item__img"
            />
            <span className="sidebar__friends__list__item__name">Jane doe</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
