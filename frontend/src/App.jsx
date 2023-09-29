import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";

import CreateProduct from "./components/create";
import EditProduct from "./components/edit";
import ShowProduct from "./components/show";
import Login from "./components/login";
import Register from "./components/register";
import User from "./components/user";

function App() {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();
  //Inactivty Test
  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");
    if (expireTime < Date.now()) {
      setLogin(false);
      sessionStorage.removeItem("access_token");
      navigate("/login");
    }
  };

  const updateExpireTime = () => {
    const expireTime = Date.now() + 100000;
    localStorage.setItem("expireTime", expireTime);
  };

  useEffect(() => {
    updateExpireTime();
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  useEffect(() => {
    const interal = setInterval(() => {
      checkForInactivity();
    }, 1000);
    return () => clearInterval(interal);
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ShowProduct />}></Route>
        <Route path="/create" element={<CreateProduct />}></Route>
        <Route path="/edit/:id" element={<EditProduct />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/user" element={<User />}></Route>
        {/* <Route path="/search" element={<SearchProduct />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
