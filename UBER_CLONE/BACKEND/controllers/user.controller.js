const express = require('express')
const {validationResult} = require('express-validator')
const userModel = require('../models/user')
const userService = require('../services/user.service')
const blacklistModel = require('../models/blacklistToken.model')




module.exports.registerUser = async(req,res,next) =>{
    const errors = validationResult(req);   
     // this is an array
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {fullname,email,password}=req.body;

    const isOldUser = await userModel.findOne({email:email});

    if(isOldUser){
        return res.status(400).json({message:"user already exist"})
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user =await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    })

    const token = user.generateAuthToken();
    res.status(201).json({token,user})
}

module.exports.loginUser = async(req,res,next)=>{

    console.log('at loginuser backend')
    const errors = validationResult(req);   
         // this is an array
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    console.log('at userlogin backend')
    console.log(email,password)
    const user = await userModel.findOne({email:email}).select('+password');
    console.log("found user")
    if(!user){
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch =await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(201).json({token,user})
}

module.exports.getUserProfile = async (req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req,res,next) =>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    await blacklistModel.create({token});
    res.status(200).json({message:"Logged Out"})
}