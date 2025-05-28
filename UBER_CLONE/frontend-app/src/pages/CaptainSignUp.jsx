import React, { useContext } from "react";
import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

export default function CaptainSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const navigate = useNavigate();

  console.log("i am in captain signup page");


  const {captain,setCaptain,isLoading,setIsLoading} = useContext(CaptainDataContext);

  async function onSubmitHandler(e) {
    e.preventDefault();

    const capatainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    console.log(capatainData);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,capatainData)

    if(response.status === 201){
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token',data.token);
      navigate('/captain-home')
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleCapacity("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleType("");
  }
  return (
    <>
      <img
        className="logoimg ms-4 mt-4"
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        alt="homebackegroundimg"
      />
      <div className=" mt-3 signup">
        <h4 className="text-center fs-2 fw-bolder">Sign Up</h4>
        <form onSubmit={onSubmitHandler} className="mt-3">
          <div className="mb-3">
            <label className="form-label fw-bold">Captain Name</label>
            <div className="d-flex gap-3">
              <input
                required
                type="text"
                className="form-control"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                type="text"
                className="form-control"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email address
            </label>
            <input
              required
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label  fw-bold">
              Password
            </label>
            <input
              required
              className="form-control mb-3"
              type="password"
              id="password"
              placeholder="passwrod"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Vehicle Information</label>
            <div className="d-flex gap-2 mb-2">
              <input
                required
                type="text"
                className="form-control w-50"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              <input
                required
                type="text"
                className="form-control w-50"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2">
              <input
                required
                type="number"
                className="form-control w-50"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <div className="dropdown rounded w-50">
                <select
                  required
                  className="form-control"
                  value={vehicleType}
                  onChange={(e) => {
                    setVehicleType(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select Vehicle Type
                  </option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="motorcycle">Moto</option>
                </select>
              </div>
            </div>
          </div>
          <div className="d-block">
            <button type="submit" className="btn btn-dark fw-bold w-100">
              Create Captain Account
            </button>
          </div>
          <p className="text-center mt-2">
            {" "}
            Already have a account?{" "}
            <Link to="/captain-login" className="text-decoration-none">
              Login here
            </Link>
          </p>
        </form>
        <div>
          <p className="px-3 text-center text-muted">
            This site is protected by{" "}
            <span className="fw-semibold">reCAPTCHA</span> and is subject to the
            <span className="text-primary fw-semibold">
              {" "}
              Google Privacy Policy
            </span>{" "}
            and
            <span className="text-primary fw-semibold"> Terms of Service</span>.
          </p>
        </div>
      </div>
    </>
  );
}
