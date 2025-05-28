import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function CaptainLogout() {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) =>{
        if(response.status === 200){
            localStorage.removeItem('token');
            navigate('/captain-login')
        }
    }).catch(err =>{
        console.log(err);
    })
  return (
    <div>UserLogout</div>
  )
}
