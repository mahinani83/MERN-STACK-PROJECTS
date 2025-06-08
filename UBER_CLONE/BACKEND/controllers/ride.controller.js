const express = require('express');
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user');
const rideModel = require('../models/ride');
const rideService = require('../services/ride.service');
const mapService = require('../services/map.service');
const { v4: uuidv4 } = require('uuid');
const {sendMessageToSocketId} = require('../socket');
const captainModel = require('../models/captain');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    const { userId, pickup, destination,fare,vehicleType } = req.body;
    try {
        // Validate user existence
        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate captain existence if provided

        // Create a new ride
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        const captainsAvailable = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 5); // Assuming 5 km radius

        if(captainsAvailable.length === 0){
            return res.status(404).json({ error: 'No captains available in your area' });
        }

        const distanceAndTime = await mapService.getDistanceTime(pickup, destination);
        const distance = distanceAndTime?.distance?.value/1000;
        const newRide =await rideService.createRide({
            user: existingUser._id,
            pickup,
            destination,
            fare,
            vehicleType,
            distance
        });


        const rideWithUser = await rideModel.findById(newRide._id).populate('user');
        rideWithUser.otp = "";
        captainsAvailable.map(captain =>{  
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser 
            });            
        })

        res.status(201).json(newRide);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports.acceptRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        // Validate ride existence
        const existingRide = await rideModel.findById(rideId).populate('user');
        if (!existingRide) {
            return res.status(404).json({ error: 'Ride not found' });
        }
        // Validate captain existence
        const existingCaptain = await captainModel.findById(req.captain._id);
        if (!existingCaptain) {
            return res.status(404).json({ error: 'Captain not found' });
        }
        console.log("existingCaptain", existingCaptain);

        // Update ride with captain details
        existingRide.captain = existingCaptain._id;
        existingRide.status = 'accepted';
        await existingRide.save();

        const ride = await rideModel.findById(existingRide._id)
            .select('+otp') // Exclude OTP from the response
            .populate('user')
            .populate('captain');
        // Notify the user about the ride confirmation

        console.log("ride from backedn",ride);
        sendMessageToSocketId(existingRide.user.socketId, {
            event: 'ride-confirmed',
            data: ride  
        });

        res.status(200).json(existingRide);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.startRide = async (req,res)  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId,otp } = req.body;
    try {
         const currentCaptain = await captainModel.findById(req.captain._id);
        if (!currentCaptain) {
            res.status(404).json({ error: 'Captain not found' });
        }
        const ride = await rideService.startRide(rideId,otp);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride  
        });

        res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        res.status(status).json({ error: message });
    }
}


module.exports.endRide = async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;
    try {
        const ride = await rideService.endRide(rideId);
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride  
        });
        res.status(200).json(ride);
    } catch (error) {
        console.error(error);
        const status = error.status || 500;
        const message = error.message || 'Internal server error';
        res.status(status).json({ error: message });
    }
}

        



