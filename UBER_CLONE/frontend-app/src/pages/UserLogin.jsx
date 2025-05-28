
import React, { useContext, useState } from "react";
import {Link,useNavigate} from "react-router-dom"
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";


export default function UserLogin() {
  
  const navigate = useNavigate()

  const {user,setUser} = useContext(UserDataContext)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('');


  async function onSubmitHandler(e){
    e.preventDefault();
    const loginData = {
      email:email,
      password:password
    }

    try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,loginData)
    if(response.status === 201){
      console.log('login response',response.data)
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token)
      navigate('/home')
    }
  } catch(err){
    const errorMsg =
      err?.response?.data?.message ||
      err?.message ||
      "Login failed. Please try again.";
    console.log('error in user login', errorMsg);
    toast.error(errorMsg);
}

  }
  return (
    <>

    <img
        className="logoimg ms-4 mt-4"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="homebackegroundimg"
      />
      <div className=" mt-3 login">
        <h4 className="text-center fs-2 fw-bolder">Login</h4>
        <form  onSubmit={onSubmitHandler} className="mt-3">
          <div className="mb-3">
            <label forname="email" className="form-label fw-bold">
              Email address
            </label>
            <input
            required
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label forname="password" className="form-label  fw-bold">
              Password
            </label>
            <input
            required
              className="form-control mb-3"
              type="password"
              id="password"
              placeholder="passwrod"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            ></input>
            <div className="d-block">
              <button type="submit" className="btn btn-dark fw-bold w-100">
                Login
              </button>
            </div>
            <p className="text-center mt-2"> New Here? <Link to="/signup" className="text-decoration-none">Create New Account</Link></p>
          </div>
          <Link to="/captain-signup" className="d-block text-decoration-none bg-success text-center text-white fw-bold py-2 rounded">Sign in as Captain</Link>
        </form>
      </div>
    </>
  );
}
