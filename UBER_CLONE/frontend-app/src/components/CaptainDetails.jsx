import React from "react";
import { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

export default function CaptainDetails({captain}) {

  return (
    <div className="container mt-4 mb-3 h-25">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <img
            className="rounded-circle"
            style={{ width: "15vmin", height: "15vmin" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt=""
          />
          <h4 className="h5 text-capitalize fw-bold mb-0">{captain.fullname.firstname +" "+captain.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className="h5 font-weight-bold">₹295.20</h4>
          <p className="text-muted small mb-0">Earned</p>
        </div>
      </div>

      <div className="d-flex p-3 mt-4 bg-light rounded justify-content-center gap-3 align-items-start">
        <div className="text-center">
          <i className="ri-timer-2-line display-4 mb-2"></i>
          <h5 className="h6 font-weight-medium">10.2</h5>
          <p className="text-dark fw-semibold small mb-0">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="ri-speed-up-line display-4 mb-2"></i>
          <h5 className="h6 font-weight-medium">10.2</h5>
          <p className="text-dark fw-semibold small mb-0">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="ri-booklet-line display-4 mb-2"></i>
          <h5 className="h6 font-weight-medium">10.2</h5>
          <p className="text-dark fw-semibold small mb-0">Hours Online</p>
        </div>
      </div>
    </div>
  );
}
