import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { IoCashOutline } from "react-icons/io5";

export default function LookingForDriver({fare,pickup,destination,vehicleType,setVehicleFound}) {
  return (
     <div>
          <h3
            className="text-center pt-2 m-0"
            onClick={() => setVehicleFound(false)}
          >
            <IoIosArrowDown className="text-muted fs-2" />
          </h3>
          <h3 className="fw-bold py-3">Looking For Driver</h3>
          <div className="d-flex flex-column gap-2 py-3">
            <div className="w-100 text-center">
              <img
              className="w-50"
                src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                alt="ubercar-img"
              />
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
          </div>
        </div>
  );
}
