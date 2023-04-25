import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import "./register.scss";

const initState = {
  email: "",
  password: "",
  username: "",
  passwordRepeat: "",
};

export default function Register() {
  const [data, setData] = useState(initState);
  const [isLoading, setIsLoading] = useState(false);

  const handlerInput = (e) => {
    setData((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await axios.post("/auth/register", {
        ...data,
      });

      console.log(res);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__left">
          <h3 className="login__logo">Social</h3>
          <span className="login__desc">
            Connect with friends and the world around you on Social
          </span>
        </div>
        <div className="login__right">
          <form className="login__box" onSubmit={formSubmit}>
            <input
              placeholder="Username"
              type="text"
              className="login__input"
              name="username"
              onChange={handlerInput}
            />
            <input
              placeholder="Email"
              type="email"
              name="email"
              className="login__input"
              onChange={handlerInput}
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              className="login__input"
              onChange={handlerInput}
            />
            <input
              placeholder="Password Again"
              type="password"
              className="login__input"
              name="passwordRepeat"
              onChange={handlerInput}
            />
            <button className="login__button">
              {isLoading ? (
                <CircularProgress color="inherit" size="25px" />
              ) : (
                "Sign up"
              )}
            </button>

            <Link to="/login" className="login__register__button">
              Log into Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
