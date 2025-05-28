import React from 'react'
import {createContext,useState} from 'react'


export const CaptainDataContext = createContext();


export default function CaptainContext({children}) {
    const [ captain, setCaptain ] = useState({});
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    
    
  return (
   <CaptainDataContext.Provider value={{captain, setCaptain, isLoading, setIsLoading}}>
    {children}
    </CaptainDataContext.Provider>
  )
}
