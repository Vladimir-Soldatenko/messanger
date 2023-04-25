import { format } from "timeago.js";

import "./message.scss";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message__top">
        <img
          src="https://images.pexels.com/photos/4588036/pexels-photo-4588036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="img"
          className="message__img"
        />
        <p className="message__text">{message.text}</p>
      </div>
      <div className="message__bottom">{format(message.createdAt)}</div>
    </div>
  );
}
