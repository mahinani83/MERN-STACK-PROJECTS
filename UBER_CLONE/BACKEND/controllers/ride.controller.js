const express = require('express');
const { body, validationResult } = require('express-validator');
const rideModel = require('../models/ride');
const userModel = require('../models/user');
const captainModel = require('../models/captain');
const rideService = require('../services/ride.service');
const captainService = require('../services/captain.service');
const mapService = require('../services/map.service');
const blacklistTokenModel = require('../models/blacklistToken.model');
const { v4: uuidv4 } = require('uuid');




module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination,vehicleType } = req.body;

    try {
        // Validate user existence
        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Validate captain existence if provided

        // Create a new ride
        const newRide =await rideService.createRide({
            user: existingUser._id,
            pickup,
            destination,
            vehicleType
        });


        const captainsAvailable = await maService.getCaptainsInTheRadius(pickup,destination, 5);

        console.log('new ride created', newRide);
        res.status(201).json(newRide);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


