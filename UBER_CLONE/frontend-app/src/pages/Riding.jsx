import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { SocketContext } from '../context/SocketProvider'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState, useRef } from 'react'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const [showCompletedPopup, setShowCompletedPopup] = useState(false)
    const popupRef = useRef(null)
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)

    // Animation for the popup
    useGSAP(() => {
        if (showCompletedPopup) {
            gsap.to(popupRef.current, {
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            })
        } else {
            gsap.to(popupRef.current, {
                y: "100%",
                duration: 0.3,
                ease: "power2.in"
            })
        }
    }, [showCompletedPopup])

    // Socket event listener
    React.useEffect(() => {
        const handleRideEnded = (rideData) => {
            console.log("Ride ended:", rideData)
            setShowCompletedPopup(true)
        }

        socket.on('ride-ended', handleRideEnded)

        return () => {
            socket.off('ride-ended', handleRideEnded)
        }
    }, [socket])

    return (
        <div className='vh-100 position-relative'>
            {/* Home Button */}
            <Link to='/home' className='position-fixed end-2 top-2 h-10 w-10 bg-white d-flex align-items-center justify-content-center rounded-circle z-3'>
                <i className="fs-5 font-medium ri-home-5-line"></i>
            </Link>
            
            {/* Live Tracking Map */}
            <div className="h-100 w-100">
                <LiveTracking />
            </div>
            
            {/* Ride Completed Popup */}
            <div 
                ref={popupRef}
                className='position-fixed bottom-0 start-0 end-0 bg-white p-4 rounded-top-4 shadow-lg'
                style={{
                    transform: 'translateY(100%)',
                    zIndex: 10,
                    borderTop: '2px solid #f0f0f0'
                }}
            >
                <div className='text-center mb-3'>
                    <i className="ri-checkbox-circle-fill text-success fs-1"></i>
                    <h2 className='fw-bold mt-2'>Ride Completed!</h2>
                    <p className='text-muted'>Your ride has been successfully completed</p>
                </div>
                
                <div className='d-flex align-items-center justify-content-between mb-3'>
                    <div>
                        <h5 className='fw-semibold'>Driver</h5>
                        <p className='text-capitalize mb-0'>{ride?.captain.fullname.firstname}</p>
                    </div>
                    <div className='text-end'>
                        <h5 className='fw-semibold'>Vehicle</h5>
                        <p className='mb-0'>{ride?.captain.vehicle.plate}</p>
                    </div>
                </div>
                
                <div className='mb-3'>
                    <div className='d-flex justify-content-between'>
                        <span className='text-muted'>From</span>
                        <span className='fw-semibold'>Current Location</span>
                    </div>
                    <div className='d-flex justify-content-between mt-2'>
                        <span className='text-muted'>To</span>
                        <span className='fw-semibold'>{ride?.destination}</span>
                    </div>
                </div>
                
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <div>
                        <h5 className='fw-semibold mb-0'>Total Fare</h5>
                        <small className='text-muted'>Paid with cash</small>
                    </div>
                    <h3 className='fw-bold text-success'>₹{ride?.fare}</h3>
                </div>
                
                <button 
                    className='w-100 btn btn-success py-3 fw-bold rounded-3'
                    onClick={() => setShowCompletedPopup(false)}
                >
                    Done
                </button>
            </div>
        </div>
    )
}

export default Riding