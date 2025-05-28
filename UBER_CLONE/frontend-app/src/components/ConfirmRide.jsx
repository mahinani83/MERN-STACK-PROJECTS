import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { IoCashOutline } from "react-icons/io5";
import { MdHeight } from "react-icons/md";

export default function ConfirmRide({fare,pickup,destination,vehicleType, setConfirmRidePanel,setVehicleFound }) {

  return (
    <div>
      <h3
        className="text-center pt-2 m-0"
        onClick={() => setConfirmRidePanel(false)}
      >
        <IoIosArrowDown className="text-muted fs-2" />
      </h3>
      <h3 className="fw-bold py-3">Confirm Your Ride</h3>
      <div className="d-flex flex-column gap-2 py-3">
        <div className="w-100 text-center">
          {vehicleType === "car" ? (
            <img
              className="w-50"
              src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
              alt="uber-car-img"
            />
          ) : vehicleType === "motorcycle" ? (
            <img
              className="w-50"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
              alt="uber-motorcycle-img"
            />
          ) : (
            <img
              className="w-50"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
              alt="uber-auto-img"
            />
          )}
        </div>
        <div className="d-flex gap-2 border-bottom border-muted p-3">
          <span className="d-flex align-items-center justify-content-center me-2">
            <HiUserCircle className="fs-2" />
          </span>
          <div>
            <h4 className="m-0 fw-semibold">562/11-A</h4>
            <p className="m-0 text-muted" style={{height:"1rem"}}>{pickup}</p>
          </div>
        </div>
        <div className="d-flex gap-2 border-bottom border-muted p-3">
          <span className="d-flex align-items-center justify-content-center me-2">
            <HiLocationMarker className="fs-2" />
          </span>
          <div>
            <h4 className="m-0 fw-semibold">562/11-A</h4>
            <p className="m-0 text-muted" style={{height:"1rem"}}>{destination}</p>
          </div>
        </div>
        <div className="d-flex gap-2 p-3">
          <span className="d-flex align-items-center justify-content-center me-2">
            <IoCashOutline className="fs-2" />
          </span>
          <div>
            <h4 className="m-0 mb-2 fw-semibold" style={{height:"1rem"}}>₹{fare[vehicleType]}</h4>
            <p className="m-0 text-muted">Cash Cash</p>
          </div>
        </div>
        <button onClick={()=>{
           setVehicleFound(true)
           setConfirmRidePanel(false)
           }} className="btn btn-success w-100 fw-semibold py-2">Confirm</button>
      </div>
    </div>
  );
}
