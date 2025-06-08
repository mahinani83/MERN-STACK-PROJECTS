import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { HiUserCircle } from "react-icons/hi2";
import { HiLocationMarker } from "react-icons/hi";
import { IoCashOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import axios from 'axios';



const RidePopup = (props) => {
      async function handleAcceptRide() {
        if (!props?.ride) {
          toast.error("Ride not found")
        }
        try{
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/accept`,
                {
                rideId: props?.ride?._id
                },
                {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                }
            );
      
        }catch(error){
            console.log("error",error);
          toast.error(error.response?.data?.error || "An error occurred while accepting the ride.");
          return;
        }
        props?.setConfirmRidePopupPanel(true);
        props?.setRidePopUpPanel(false);
      }

    return (
        <div>
            <h5 
                className="p-1 text-center w-100 top-0 mb-0 mt-2" 
                onClick={() => props.setRidePopUpPanel(false)}
                style={{ cursor: 'pointer' }}
            >
                <IoIosArrowDown className="text-muted fs-2" />
            </h5>


            <h3 className="h4 font-weight-bold mb-2">New Ride Available!</h3>

  
            <div className="d-flex align-items-center justify-content-between p-3 bg-warning rounded mt-3">
                <div className="d-flex align-items-center gap-3">
                    <img 
                        className="rounded-circle" 
                        style={{ height:"15vmin",width:"15vmin",objectFit:"cover" }} 
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" 
                        alt="" 
                    />
                    <h2 className="h5 font-weight-medium mb-0">
                        {props?.ride?.user?.fullname?.firstname}
                    </h2>
                </div>
                <h5 className="h5 font-weight-semibold text-center">{props?.ride?.distance} KM</h5>
            </div>


            <div className="d-flex flex-column mb-2 align-items-center justify-content-between mt-4">
                <div className="w-100 mt-3">
                    <div className="d-flex align-items-center gap-3 p-3 border-bottom">
                    <h2 className="pe-2"><HiUserCircle /></h2>
                        <div>
                            <h3 className="h6 font-weight-medium">562/11-A</h3>
                            <p className="text-dark medium mb-0">{props?.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 p-3 border-bottom">
                    <h2 className="pe-2"><HiLocationMarker /></h2>
                        <div>
                            <h3 className="h6 font-weight-medium">562/11-A</h3>
                            <p className="text-dark medium mb-0">{props?.ride?.destination}</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-3 p-3">
                    <h2 className="pe-2"><IoCashOutline /></h2>
                        <div>
                            <h3 className="h6 font-weight-medium">{props?.ride?.fare}</h3>
                            <p className="text-dark medium mb-0">Cash Cash</p>
                        </div>
                    </div>
                </div>


                <div className="mt-3 w-100">
                    <button 
                        onClick={handleAcceptRide} 
                        className="btn btn-success w-100 font-weight-semibold py-2"
                    >
                        Accept
                    </button>
                    <button 
                        onClick={() => props.setRidePopUpPanel(false)} 
                        className="btn btn-secondary w-100 font-weight-semibold mt-2 py-2"
                    >
                        Ignore
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RidePopup;
