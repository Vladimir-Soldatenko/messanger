import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";

import "./feed.scss";

export default function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const getTimeline = async () => {
      try {
        const res = user
          ? await axios.get("/post", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await axios.get("/post/timeline/all", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
        if (res.data) {
          setPosts(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getTimeline();
  }, []);

  return (
    <div className="feed">
      <div className="feed__wrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} token={token} />
        ))}
      </div>
    </div>
  );
}
