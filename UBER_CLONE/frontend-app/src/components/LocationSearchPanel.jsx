import React, { useEffect ,useState} from "react";
import { IoLocationSharp } from "react-icons/io5";
import axios from 'axios'

export default function LocationSearchPanel({suggestions,pickup, destination, setVehiclePanel,setPanelOpen,setPickup,setDestination,activeField }) {




  const locationRef = React.useRef(null);

  function handleSuggestionClick(suggestion) {
    console.log("Clicked suggestion:", suggestion);
    if(activeField === "pickup") { 
      setPickup(suggestion);
    }
    if(activeField === "destination") {
      setDestination(suggestion);
    }
  }

  return (
    <div
     
    >
      {/* Display fetched suggestions */}
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() =>{ handleSuggestionClick(elem)
            console.log("Clicked suggestion:", elem);
          }}
          className="location-suggest d-flex gap-3 p-3 rounded align-items-center my-2"
        >
          <h2
            ref={locationRef}
            className="d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: "15%", height: "40px", backgroundColor: "#eee" }}
          >
            <IoLocationSharp />
          </h2>
          <h4 className="fw-semibold mb-0" style={{ width: "90%" }}>
            {elem}
          </h4>
        </div>
      ))}
    </div>
  );
}
