import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { IoCashOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
export default function FinishRide({setFinishRidePanel,ride}) {

    const endRide = async () => {
      console.log("ride",ride);
      if (!ride || !ride._id) {
        toast.error("Ride not found");
        return;
      }

      try{
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
          {
            rideId:ride._id // Replace with actual ride ID
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )

        console.log("response of endin ride",response);
      } catch (error) {
        console.error("Error ending ride:", error);
        toast.error(error.response?.data?.error || "An error occurred while ending the ride.");
        return;
      }
    }
  return (
    <div>
      <h5
        className="p-1 text-center w-100 top-0"
        onClick={() => setFinishRidePanel(false)}
      >
        <IoIosArrowDown className="text-muted fs-2" />
      </h5>
      <h3 className="h4 font-weight-bold mb-4">Finish this Ride</h3>

      <div className="d-flex align-items-center justify-content-between p-3 bg-warning rounded mt-4">
        <div className="d-flex align-items-center gap-3">
          <img
            className="rounded-circle"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
            style={{ height: "15vmin", width: "15vmin", objectFit: "cover" }}
          />
          <h2 className="h6 font-weight-medium">
            {ride?.user?.fullname?.firstname + " " + ride?.user?.fullname?.lastname}
          </h2>
        </div>
        <h5 className="h6 font-weight-bold">{ride?.distance} KM</h5>
      </div>

      <div className="d-flex flex-column align-items-center gap-2">
        <div className="w-100 mt-4">
          <div className="d-flex align-items-center gap-2 p-3 border-bottom">
            <h2 className="pe-2"><HiUserCircle /></h2>
            <div>
              <h3 className="h6 font-weight-medium">562/11-A</h3>
              <p className="text-dark medium mb-0">{ride?.pickup}</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 p-3 border-bottom">
            <h2 className="pe-2"><HiLocationMarker /></h2>
            <div>
              <h3 className="h6 font-weight-medium">562/11-A</h3>
              <p className="text-dark medium mb-0">{ride?.destination}</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 p-3">
            <h2 className="pe-2"><IoCashOutline /></h2>
            <div>
              <h3 className="h6 font-weight-medium">₹{ride?.fare}</h3>
              <p className="text-dark medium mb-0">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mb-4 w-100">
          <button
            onClick={endRide}
            className="btn btn-success text-white font-weight-bold w-100 mt-3"
          >
            Finish Ride
          </button>
        </div>
      </div>
    </div>
  );
}
