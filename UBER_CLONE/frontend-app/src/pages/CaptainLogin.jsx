import React from 'react'
import {useState,useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
export default function CaptainLogin() {


    console.log('inside captain login')
  
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');

    const navigate = useNavigate()
   
    const {captain,setCaptain} = useContext(CaptainDataContext);
    
  
    async function onSubmitHandler(e){
      e.preventDefault();
      const loginData = {
        email:email,
        password:password
      }
      console.log(loginData)
      try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,loginData)
       if(response.status === 200){
        const data = response.data;
        console.log('got data',data);
        localStorage.setItem('token',data.token);
        console.log('insided captain data context',data.captain);
        setCaptain(data.captain);
        navigate('/captain-home')
       }
      setEmail('')
      setPassword('')
      }catch(err){
        console.log('error in captain login',err.response.data.message)
      }
    }
  return (
    <>
    <img
        className="logoimg ms-4 mt-4"
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        alt="homebackegroundimg"
      />
      <div className=" mt-3 login">
        <h4 className="text-center fs-2 fw-bolder">Login</h4>
        <form  onSubmit={onSubmitHandler} className="mt-3">
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
              onChange={(e)=>setEmail(e.target.value)}
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
              onChange={(e)=>setPassword(e.target.value)}
            ></input>
            <div className="d-block">
              <button type="submit" className="btn btn-dark fw-bold w-100">
                Login
              </button>
            </div>
            <p className="text-center mt-2"> Join a fleet? <Link to="/captain-signup" className="text-decoration-none">Create New Account</Link></p>
          </div>
          <Link to="/login" className="d-block text-decoration-none bg-success text-center text-white fw-bold py-2 rounded">Sign in as User</Link>
        </form>
      </div>
    </>
  )
}
