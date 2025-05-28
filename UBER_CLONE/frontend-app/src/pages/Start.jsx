import React from "react";
import { Link } from "react-router-dom";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function Start() {
  return (
    <div className="d-flex flex-column  min-vh-100 justify-content-between bgimg">
      <img
        className="logoimg ms-4 mt-4"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="homebackegroundimg"
      />
      <div className="bg-white py-2 px-3 text-center">
        <h3 className="fw-bold">Get Started With Uber</h3>
        <Link
          className="w-100 p-2 d-flex justify-content-center bg-black text-white fw-bold rounded text-decoration-none"
          to="/login"
        >
          <div className="d-block ms-auto">Continue</div>
          <FaArrowAltCircleRight className="d-block ms-auto rightarrow" />
        </Link>
      </div>
    </div>
  );
}
