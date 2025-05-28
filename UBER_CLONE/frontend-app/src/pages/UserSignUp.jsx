import React, {useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

export default function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);

  async function onSubmitHandler(e) {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      newUser
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }
  return (
    <>
      <img
        className="logoimg ms-4 mt-4"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="homebackegroundimg"
      />
      <div className=" mt-3 signup">
        <h4 className="text-center fs-2 fw-bolder">Sign UP</h4>
        <form onSubmit={onSubmitHandler} className="mt-3">
          <div className="mb-3">
            <label className="form-label fw-bold">User Name</label>
            <div className="d-flex gap-3">
              <input
                required
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label forname="email" className="form-label fw-bold">
              Email address
            </label>
            <input
              required
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label forname="password" className="form-label  fw-bold">
              Password
            </label>
            <input
              required
              className="form-control mb-3"
              type="password"
              id="password"
              placeholder="passwrod"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="d-block">
            <button type="submit" className="btn btn-dark fw-bold w-100">
              Create Account
            </button>
          </div>
          <p className="text-center mt-2">
            Already have a account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login here
            </Link>
          </p>
        </form>
        <div className="text-center text-muted px-3">
          <p>
            This site is protected by{" "}
            <span className="fw-semibold">reCAPTCHA</span> and is subject to the
            <span className="text-primary fw-semibold">
              {" "}
              Google Privacy Policy
            </span>{" "}
            and
            <span className="text-primary fw-semibold"> Terms of Service</span>.
          </p>
        </div>
      </div>
    </>
  );
}
