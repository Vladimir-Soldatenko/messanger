import { useEffect, useRef, useState } from "react";
import api from "../../api/api";
import Conversetions from "../../components/conversations/Conversetions";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import CircularProgress from "@mui/material/CircularProgress";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { io } from "socket.io-client";

import "./messenger.scss";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const socket = useRef();
  const scrollRef = useRef();

  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const sendNewMessage = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const message = {
      conversationId: currentChat._id,
      text: newMessage.trim(),
      sender: currentUser._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== currentUser._id
    );

    socket.current.emit("sendMessage", {
      receiverId,
      text: newMessage.trim(),
      senderId: currentUser._id,
    });

    try {
      const res = await api.messages.sendMessage(message);
      setMessages((x) => [...x, res]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((x) => [...x, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUsers", currentUser._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [currentUser]);

  useEffect(() => {
    const getConversation = async () => {
      const res = await api.conversations.getUserConversations(currentUser._id);
      setConversations(res.data);
    };
    getConversation();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const res = await api.messages.getMessages(currentChat._id);
          setMessages(res);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollDown = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chat__menu">
          <div className="chat__menu__wrapper">
            <input
              type="text"
              placeholder="Search"
              className="chat__menu__search"
            />
            {conversations.length > 0 &&
              conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversetions key={c._id} conversation={c} />
                </div>
              ))}
          </div>
        </div>
        <div className="chat__box">
          {currentChat ? (
            <div className="chat__box__wrapper">
              <div className="chat__box__top">
                {messages.length > 0 &&
                  messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        key={m._id}
                        message={m}
                        own={m.sender === currentUser._id}
                      />
                    </div>
                  ))}
                <ExpandMoreIcon
                  onClick={scrollDown}
                  className="chat__box__top__arrow__down"
                />
              </div>
              <div className="chat__box__bottom">
                <textarea
                  className="chat__message__input"
                  placeholder="Your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>
                <button
                  onClick={sendNewMessage}
                  className="chat__submit__button"
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size="20px" />
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
