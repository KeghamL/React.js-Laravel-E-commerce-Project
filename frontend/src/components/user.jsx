import axios from "axios";
import Navv from "./nav";
import React, { useEffect, useState } from "react";

export default function User() {
  const [users, setUsers] = useState("");
  const useToken = JSON.stringify(sessionStorage.getItem("access_token")) || "";
  const Token = JSON.parse(useToken);
  const headers = {
    accept: "application/json",
    Authorization: "Bearer " + useToken,
  };
  useEffect(() => {
    fetchuser();
  }, []);

  const fetchuser = () => {
    axios
      .get("http://127.0.0.1:8000/api/auth/me", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + Token,
        },
      })
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((error) => {
        alert("error", error.response);
      });
  };
  return (
    <div>
      <Navv />
      <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Name</h6>
                          <p className="text-muted">{users.name}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{users.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>User_ID</h6>
                          <p className="text-muted">{users.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
