const captainModel = require("../models/captain")
const userModel = require("../models/user")
const jwt = require('jsonwebtoken')
const blackListTokenModel = require('../models/blacklistToken.model')



module.exports.authUser = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({message:"Unauthorized token not found"})
    }
    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized is blacklisted"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:"Unauthorized user not found"})
        }
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized got an error"})
    }
}

module.exports.authCaptain = async (req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if(!token){
        return res.status(401).json({message:"Unauthorized token not found"})
    }
    
    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized blacklisted"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if(!captain){
            return res.status(401).json({message:"Unauthorized captain not found"})
        }
        req.captain = captain;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized err ata token handling"})
    }
}