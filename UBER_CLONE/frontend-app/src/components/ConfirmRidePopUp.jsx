import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { IoCashOutline } from "react-icons/io5";

export default function ConfirmRidePopUp({ setConfirmRidePopupPanel, setRidePopUpPanel}) {
  const [otp, setOtp] = React.useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h3
        className="text-center pt-2"
        onClick={() =>{ 
          setConfirmRidePopupPanel(false);
          setRidePopUpPanel(true);
        }}
      >
        <IoIosArrowDown className="text-muted fs-2" />
      </h3>
      <h3 className="h5 font-weight-bold mb-3">Confirm this ride to Start</h3>
      <div className="d-flex align-items-center justify-content-between bg-warning p-3 border border-warning rounded mt-4">
        <div className="d-flex align-items-center gap-3 ">
          <img
            className="rounded-circle"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
            style={{ height: "15vmin", width: "15vmin", objectFit: "cover" }}
          />
          <h2 className="h6 font-weight-medium text-capitalize">
            mahendar puliganti
          </h2>
        </div>
        <h5 className="h6 font-weight-bold">2.2 KM</h5>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="w-100 mt-4">
          <div className="d-flex align-items-center gap-2 p-1 border-bottom">
            <h2 className="pe-2"><HiUserCircle /></h2>
            <div className="pt-2">
              <h3 className="h6 font-weight-medium">562/11-A</h3>
              <p className="text-dark medium mb-0">hyderabad</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 p-1 border-bottom">
          <h2 className="pe-2"><HiLocationMarker /></h2>
            <div className="pt-2">
              <h3 className="h6 font-weight-medium">562/11-A</h3>
              <p className="text-dark medium mb-0">mumbai</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 p-1">
          <h2 className="pe-2"><IoCashOutline /></h2>
            <div className="pt-2">
              <h3 className="h6 font-weight-medium">₹1000</h3>
              <p className="text-dark medium mb-0">Cash</p>
            </div>
          </div>
        </div>

        <div className="w-100 mb-2">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="form-control bg-light font-monospace text-lg rounded mt-3"
              placeholder="Enter OTP"
            />
            <Link to="/captain-riding" className="btn btn-success w-100 mt-3">
              Confirm
            </Link>
            <button
              type="button"
              onClick={() => {
                setConfirmRidePopupPanel(false);
                setRidePopUpPanel(true);
              }}
              className="btn btn-danger w-100 mt-2"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
