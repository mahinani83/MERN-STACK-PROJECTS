import React, { useRef, useState, useEffect } from "react";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketProvider";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopUp";
import ConfirmRidePopup from "../components/ConfirmRidePopUp";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdExitToApp } from "react-icons/md";

export default function CaptainHome() {
  const { captain } = useContext(CaptainDataContext);

  const { socket } = useContext(SocketContext);

  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation();

    return () => clearInterval(locationInterval);
  }, []);

  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUpPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

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
      <div className="bg-white position-fixed bottom-0 px-3 h-0 w-100 ">
        <CaptainDetails />
      </div>
      <div
        className="bg-white position-fixed bottom-0 px-3 h-0 w-100"
        style={{ transform: "translateY(100%)" }}
        ref={ridePopUpPanelRef}
      >
        <RidePopup
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
      <div
        className="bg-white position-fixed bottom-0 px-3 h-0 w-100"
        style={{ transform: "translateY(100%)" }}
        ref={confirmRidePopupPanelRef}
      >
        <ConfirmRidePopup
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
}
