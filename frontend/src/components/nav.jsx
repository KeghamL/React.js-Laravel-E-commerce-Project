import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "react-bootstrap-icons";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style2.css";
import { Navigate, useNavigate } from "react-router-dom";
import "@popperjs/core";
import "bootstrap";
import { Link } from "react-router-dom";
import Login from "./login";

export default function Navv() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userloggedin, setUserloggedin] = useState(false);

  const logout = async () => {
    sessionStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <a className="navbar-brand">Home</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {sessionStorage.getItem("access_token") ? (
          <Link to={"/user"} style={{ textDecoration: "none" }}>
            <i
              className="bi bi-person"
              style={{ color: "white", fontSize: "23px" }}
            ></i>
          </Link>
        ) : null}

        {sessionStorage.getItem("access_token") ? (
          <Link to={"/create"} style={{ textDecoration: "none" }}>
            <a className="navbar-brand">Create</a>
          </Link>
        ) : null}

        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Authentication
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <Link to={"/register"} style={{ textDecoration: "none" }}>
                    <a className="dropdown-item" href="#">
                      Register
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    <a className="dropdown-item">Login</a>
                  </Link>
                </li>
                <li>
                  {sessionStorage.getItem("access_token") ? (
                    <a className="dropdown-item" onClick={logout}>
                      Logout
                    </a>
                  ) : null}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
