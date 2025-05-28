import React from 'react'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import {useEffect,useContext} from "react"
import {useNavigate} from 'react-router-dom'

export default function CaptainProtectWrapper({children}) {


    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    const {isLoading,setIsLoading,setCaptain} = useContext(CaptainDataContext)

    useEffect(()=>{
        if(!token){
            navigate('/captain-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }}).then((response) =>{
                if(response.status === 200){
                setCaptain(response.data);
                setIsLoading(false);
                }
            } ).catch((err)=>{
                localStorage.removeItem('token')
                console.log(err);
                navigate('/captain-login')
            })
    },[token])
    
    if (isLoading) {
      
        return (
            <div>Loading...</div>
        )
    }
  return (
    <>
    {children}
    </>
  )
}
