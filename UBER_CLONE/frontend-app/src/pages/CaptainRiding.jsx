import React, { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CaptainRiding() {
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);

  useGSAP(function () {
    if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(finishRidePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ finishRidePanel ])

  return (
    <div className="vh-100 vw-100 position-relative overflow-hidden userhome ">
      <div className="w-100 d-flex align-items-center justify-content-between position-absolute top-0">
        <img
          className="logoimg position-absolute top-0 ms-4 mt-4"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="homebackegroundimg"
        />
        <Link
          to="/captain-home"
          className="ms-auto fs-2 px-3 py-2 rounded bg-white me-4 mt-4 "
        >
          <MdExitToApp />
        </Link>
      </div>
      <div className="vh-100 vw-100">
        <img
          className="h-100 w-100 object-fit-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="uberhomemap"
        />
      </div>
      <div className="w-100 py-2 d-flex flex-column align-items-center justify-content-between position-fixed bottom-0 bg-warning rounded">
        <h5>
          <IoIosArrowUp className="text-dark fs-2" />
        </h5>
        <div
          className=" p-4 w-100 d-flex aling-items-center justify-content-between"
          style={{ height: "20%", paddingTop: "2.5rem" }}
          onClick={() => setFinishRidePanel(true)}
        >
          <h4 className="h5 font-weight-semibold">{"4 KM away"}</h4>
          <button className="btn btn-success text-white font-weight-bold px-4 py-2 rounded">
            Complete Ride
          </button>
        </div>
      </div>
      <div ref={finishRidePanelRef} className="bg-white position-fixed bottom-0 px-3 h-0 w-100" style={{ transform: "translateY(100%)" }} >
              <FinishRide setFinishRidePanel={setFinishRidePanel} />
        </div>
    </div>
  );
}
