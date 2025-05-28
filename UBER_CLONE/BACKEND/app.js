require('dotenv').config();
const express = require('express');
const app = express()
const cors = require('cors')
const connectToDb = require('./db/db');
const userRoutes = require('./router/user.router');
const captainRoutes = require('./router/captain.router');
const rideRoutes = require('./router/ride.router');
const mapRoutes = require('./router/map.router');
const cookieParser = require('cookie-parser');


connectToDb();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapRoutes);
app.use('/rides',rideRoutes);


module.exports = app    