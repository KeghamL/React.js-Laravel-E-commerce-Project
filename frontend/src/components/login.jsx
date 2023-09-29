import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import User from "./user";
import Navv from "./nav";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState([]);

  const login = async (e, user) => {
    e.preventDefault();
    try {
      await axios
        .post("http://127.0.0.1:8000/api/auth/login", {
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("access_token", res.data.access_token);
          sessionStorage.getItem("user", JSON.stringify("user"));
          JSON.parse(sessionStorage.getItem("user"));
          Swal.fire({
            title: "Welcome",
          });
          navigate("/");
        });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };
  return (
    <div>
      <Navv />
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden"
      >
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column justify-content-center"
          >
            <h1
              className="my-5 display-3 fw-bold ls-tight px-3"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Are you exited <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                To enter the best E-commerce website!
              </span>
            </h1>

            <p className="px-3" style={{ color: "hsl(218, 81%, 85%)" }}>
              When you will see the veriety of products that you can purchase or
              having a look to our awesome webiste and experience the color user
              interface that will change your mind about E-commerce world!
            </p>
          </MDBCol>

          <MDBCol md="6" className="position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <MDBCard className="my-5 bg-glass">
              <MDBCardBody className="p-5">
                <h3
                  className="fw-normal mb-3 ps-3 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Log in
                </h3>
                <form onSubmit={login}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="form3"
                    type="email"
                  />
                  {errors.email && (
                    <div className="flex">
                      <span className="col-sm-2 col-form-label text-danger">
                        {errors.email[0]}
                      </span>
                    </div>
                  )}
                  &nbsp;
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="form4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                  {errors.password && (
                    <div className="flex">
                      <span className="col-sm-2 col-form-label text-danger">
                        {errors.password[0]}
                      </span>
                    </div>
                  )}
                  &nbsp;
                  <MDBBtn className="w-100 mb-4" size="md">
                    login
                  </MDBBtn>
                </form>
                <div className="text-center">
                  <p>
                    Do your need to <Link to="/register">Register</Link> first?
                  </p>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="facebook-f" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="twitter" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="google" size="sm" />
                  </MDBBtn>

                  <MDBBtn
                    tag="a"
                    color="none"
                    className="mx-3"
                    style={{ color: "#1266f1" }}
                  >
                    <MDBIcon fab icon="github" size="sm" />
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
