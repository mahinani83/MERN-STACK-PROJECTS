const express = require('express');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');

const router = express.Router();

// POST route to create a new ride
router.post(
    '/create',
    [
        body('userId').notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid User ID'),
        body('pickup').notEmpty().withMessage('Pickup location is required'),
        body('destination').notEmpty().withMessage('Destination is required'),
        body('vehicleType').notEmpty().withMessage('Vehicle type is required').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type'),
    ],authMiddleware.authUser,rideController.createRide
);


module.exports = router;