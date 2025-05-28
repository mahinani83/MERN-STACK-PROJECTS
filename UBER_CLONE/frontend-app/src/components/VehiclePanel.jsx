import React from "react";
import { MdPerson } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

export default function VehiclePanel({
  setVehicleType,
  fare,
  setVehiclePanel,
  setConfirmRidePanel,
}) {
  return (
    <div>
      <h3
        className="text-center pt-2 m-0"
        onClick={() => setVehiclePanel(false)}
      >
        <IoIosArrowDown className="text-muted fs-2" />
      </h3>
      <h3 className="fw-bold py-3">Choose Your Vehicle</h3>
      <div
        className="vehicle-select d-flex align-items-center justify-content-center gap-2 rounded-3 mb-3 p-2"
        onClick={() => {
          setVehicleType("car");
          setConfirmRidePanel(true);
          setVehiclePanel(false);
        }}
      >
        <img
          className="w-25"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="uber-car-img"
        />
        <div className="d-flex flex-column gap-0">
          <p className="m-0 fw-semibold" style={{ fontSize: "5.5vmin" }}>
            UberGo
            <span>
              <MdPerson />
            </span>
            <span style={{ fontSize: "4.5vmin" }}>4</span>
          </p>
          <p className="m-0" style={{ fontWeight: "645" }}>
            2 min away
          </p>
          <p className="text-muted">affordable,compact rides</p>
        </div>
        <p className="fs-2 fw-semibold" style={{height:"1rem"}}>₹{fare.car}</p>
      </div>
      <div
        className="vehicle-select d-flex align-items-center justify-content-center gap-2 rounded-3  mb-3 p-2"
        onClick={() => {
          setVehicleType("motorcycle");
          setConfirmRidePanel(true);
          setVehiclePanel(false);
        }}
      >
        <img
          className="w-25"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="uber-auto-img"
        />
        <div className="d-flex flex-column gap-0">
          <p className="m-0 fw-semibold" style={{ fontSize: "5.5vmin" }}>
            UberGo
            <span>
              <MdPerson />
            </span>
            <span style={{ fontSize: "4.5vmin" }}>4</span>
          </p>
          <p className="m-0" style={{ fontWeight: "645" }}>
            2 min away
          </p>
          <p className="text-muted">affordable,compact rides</p>
        </div>
        <p className="fs-2 fw-semibold" style={{height:"1rem"}}>₹{fare.motorcycle}</p>
      </div>
      <div
        className="vehicle-select d-flex align-items-center justify-content-center gap-2 rounded-3 mb-3 p-2"
        onClick={() => {
          setVehicleType("auto");
          setConfirmRidePanel(true);
          setVehiclePanel(false);
        }}
      >
        <img
          className="w-25"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt="uber-bike-img"
        />
        <div className="d-flex flex-column gap-0">
          <p className="m-0 fw-semibold" style={{ fontSize: "5.5vmin" }}>
            UberGo
            <span>
              <MdPerson />
            </span>
            <span style={{ fontSize: "4.5vmin" }}>4</span>
          </p>
          <p className="m-0" style={{ fontWeight: "645" }}>
            2 min away
          </p>
          <p className="text-muted">affordable,compact rides</p>
        </div>
        <p className="fs-2 fw-semibold" style={{height:"1rem"}}>₹{fare.auto}</p>
      </div>
    </div>
  );
}
