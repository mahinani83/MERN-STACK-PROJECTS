const express = require('express')
const {validationResult} = require('express-validator')
const captainModel = require('../models/captain')
const captainService = require('../services/captain.service')
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async(req,res,next) =>{
    const errors = validationResult(req);   
             // this is an array
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {fullname, email, password, vehicle}=req.body;

    console.log('in registerCaptain controller',fullname, email, password, vehicle)

    const isOldCaptain = await captainModel.findOne({email:email});

    if(isOldCaptain){
        return res.status(400).json({message:"captain already exist"});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    console.log('hashed password',hashedPassword)

    const captain =await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })  

    console.log('captain created',captain)

    const token = captain.generateAuthToken();
    console.log('token generated')
    res.status(201).json({token,captain})
}


module.exports.loginCaptain = async(req,res,next)=>{

    const errors = validationResult(req);

    console.log('in loginCaptain controller')

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    console.log('backend ?')
    console.log(email,password)
    const captain = await captainModel.findOne({email:email}).select('+password');

    if(!captain){
        return res.status(400).json({message:"invalid email or password"})
    }

    console.log('found captain',captain)

    isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({message:"invalid email or password"})
    }

    const token = captain.generateAuthToken();
    console.log('token generated')
    res.cookie('token',token);
    res.status(200).json({token,captain})
}

module.exports.getCaptainProfile = async (req,res,next) =>{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    res.clearCookie('token');
    await blacklistTokenModel.create({token});
    res.status(200).json({message:"Logged Out"})
}