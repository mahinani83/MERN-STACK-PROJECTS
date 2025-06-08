
const captainModel = require('../models/captain');
const rideModel = require('../models/ride');
const mapService = require('./map.service');
const crypto = require('crypto');


async function getFare(pickup,destination){
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    if (!distanceTime) {
        throw new Error('Unable to fetch distance and time');
    }
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;

}




function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports = {getFare,getOtp}




module.exports.createRide = async ({ user, pickup, destination,fare,vehicleType,distance }) => {
    
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const newRide = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare:fare,
        distance:distance
    });

    return newRide;
}

module.exports.startRide = async (rideId,otp) => {
    if (!rideId || !otp) {
        throw new Error('Ride ID and Captain ID are required');
    }

    const ride = await rideModel.findById(rideId).populate('user').populate('captain').select('+otp');
    if (!ride) {
        const err = new Error('Ride not found');
        err.status = 404;
        throw err;
    }

    if (ride.status !== 'accepted') {
        const error = new Error('Ride must be accepted before starting');
        error.status = 400;
        throw error;
    }

    if (ride.otp !== otp) {
       const error = new Error('Invalid OTP');
        error.status = 400;
        throw error;
    }

    ride.status = 'ongoing';
    await ride.save();

    return ride;
}


module.exports.endRide = async (rideId) =>{
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    const ride = await rideModel.findById(rideId).populate('user').populate('captain');
    if (!ride) {
        const err = new Error('Ride not found');
        err.status = 404;
        throw err;
    }

    ride.status = 'completed';
    await ride.save();

    return ride;
}