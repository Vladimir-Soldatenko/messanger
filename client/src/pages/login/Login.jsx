import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../api/api";
// import { useAuthContextSetState } from "../../context/AuthContext";

import "./login.scss";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [userInfo, setUserInfo] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // const setUser = useAuthContextSetState();

  const handleInput = (e) => {
    setUserInfo((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await api.auth.login(userInfo);
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));

      // setUser(res.data.user);
      navigate("/");
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
              placeholder="email"
              type="email"
              className="login__input"
              name="email"
              onChange={handleInput}
            />
            <input
              placeholder="password"
              type="password"
              className="login__input"
              name="password"
              onChange={handleInput}
            />
            <button className="login__button">
              {isLoading ? (
                <CircularProgress color="inherit" size="25px" />
              ) : (
                "Log in"
              )}
            </button>
            <span className="login__forgot">Forgot Password</span>
            <button className="login__register__button">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
