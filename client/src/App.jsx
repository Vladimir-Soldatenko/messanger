import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

function App() {
  const [user, setUser] = useState(sessionStorage.getItem("token"));
  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Navigate to="/login" /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/login" /> : <Messenger />}
        />
        <Route
          path="/profile/:id"
          element={!user ? <Navigate to="/login" /> : <Profile />}
        />
      </Routes>
    </Router>
  );
}

export default App;
