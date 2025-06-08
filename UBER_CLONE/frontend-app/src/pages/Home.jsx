import React from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import { useContext, useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { UserDataContext } from "../context/UserContext";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketProvider";
import { IoIosArrowDown } from "react-icons/io";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { toast } from "react-toastify";
import LiveTracking from "../components/LiveTracking";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const navigate = useNavigate();

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const locationInputRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const locationSubmitbtnRef = useRef(null);

  const { user } = useContext(UserDataContext);
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  function submitHandler(e) {
    e.preventDefault();
  }

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    console.log("ride-confirmed event received", ride);
    setRide(ride);
    setVehicleFound(false);
    setWaitingForDriver(true);
  });

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
  });


 async function handleConfirmRide(){
  try{
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,{
        userId:user._id,
        pickup: pickup,
        destination: destination,  
        fare:fare[vehicleType],
        vehicleType: vehicleType,
      
      },{headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
  } catch(err){
    console.error("Error creating ride:", err);
    toast.error(err?.response?.data?.error);
    return;
  }
   setVehicleFound(true);
   setConfirmRidePanel(false);
 }

  async function onLocationChange(e) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const suggestions = response.data;
      setSuggestions([...suggestions]);
    } catch (error) {
      console.log(error);
    }
  }



  const locationSubmitHandler = () => {
    if (pickup.length !== 0 || destination.length !== 0) {
      try {
        axios
          .get(`${import.meta.env.VITE_BASE_URL}/maps/get-fare`, {
            params: { pickup: pickup, destination: destination },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setFare(res.data);
          });
        setVehiclePanel(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please enter a pickup and destination location");
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "60%",
          overflowY: "auto",
          // padding: 24,
          // opacity:1
        });
        gsap.to(locationInputRef.current, {
          paddingBottom: "2vmin",
          height: "40%",
          borderRadius: "none",
        });
        gsap.to(panelCloseRef.current, {
          opacity: "1",
        });
        gsap.to(locationSubmitbtnRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0px",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
        gsap.to(locationInputRef.current, {
          paddingBottom: "2vmin",
          height: "35%",
        });
        gsap.to(locationSubmitbtnRef.current, {
          opacity: "0",
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0%)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="vh-100 vw-100 position-relative overflow-hidden userhome ">
      <img
        className="logoimg position-absolute top-0 ms-4 mt-4"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="homebackegroundimg"
      />
      <div className="vh-100 vw-100">
        <LiveTracking />
      </div>
      <div className="w-100 h-100 d-flex flex-column justify-content-end position-absolute bottom-0">
        <div
          className="bg-white px-3 py-2 rounded-3"
          style={{ height: "30%" }}
          ref={locationInputRef}
        >
          <div className="d-flex w-100" ref={panelCloseRef}>
            <IoIosArrowDown
              className="ms-auto fs-2 mt-2"
              onClick={() => setPanelOpen(false)}
            />
          </div>

          <h3 className="fs-2 fw-bold">Find a Trip</h3>
          <form
            className="position-relative"
            onSubmit={(e) => submitHandler(e)}
          >
            <div className="position-absolute rounded-5 home-line"></div>
            <input
              value={pickup}
              onClick={() => {
                setPanelOpen(true);
                setSuggestions([]);
              }}
              onChange={(e) => {
                onLocationChange(e);
                setPickup(e.target.value);
                setActiveField("pickup");
              }}
              type="text"
              className="w-100 rounded mb-2 px-5"
              placeholder="Add a Pick Up Location"
            />
            <input
              value={destination}
              onClick={() => {
                setPanelOpen(true);
                setSuggestions([]);
              }}
              onChange={(e) => {
                onLocationChange(e);
                setDestination(e.target.value);
                setActiveField("destination");
              }}
              type="text"
              className="w-100 rounded px-5"
              placeholder="Enter Your Destination"
            />
          </form>
          <button
            ref={locationSubmitbtnRef}
            onClick={locationSubmitHandler}
            className="btn bg-dark fw-semibold w-100 text-white rounded z-3 mt-3 position-relative"
          >
            Search
          </button>
        </div>
        <div className="bg-white px-3 h-0 w-100" ref={panelRef}>
          <LocationSearchPanel
            suggestions={suggestions}
            pickup={pickup}
            destination={destination}
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
          />
        </div>

        <div
          className="position-fixed bottom-0 z-3 bg-white rounded px-3"
          style={{ transform: "translateY(100%)" }}
          ref={vehiclePanelRef}
        >
          <VehiclePanel
            fare={fare}
            setVehiclePanel={setVehiclePanel}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleType={setVehicleType}
          />
        </div>
        <div
          className="position-fixed bottom-0 z-3 bg-white rounded px-3"
          style={{ transform: "translateY(100%)" }}
          ref={confirmRidePanelRef}
        >
          <ConfirmRide
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            handleConfirmRide={handleConfirmRide}
          />
        </div>
        <div
          className="position-fixed bottom-0 z-3 bg-white rounded px-3"
          style={{ transform: "translateY(100%)" }}
          ref={vehicleFoundRef}
        >
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            vehicleType={vehicleType}
            fare={fare}
            setVehicleFound={setVehicleFound}
          />
        </div>
        <div
          className="position-fixed bottom-0 z-3 bg-white rounded px-3"
          style={{ transform: "translateY(100%)" }}
          ref={waitingForDriverRef}
        >
          <WaitingForDriver 
            setWaitingForDriver={setWaitingForDriver}
            ride={ride}
          />
        </div>
      </div>
    </div>
  );
}
