// package require 
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const { app } = require('./src/app.js')
const serverless = require('serverless-http');

// env configuration 
dotenv.config();

// mongodb connection 
mongoose.connect(process.env.MONGODB_URL,
    { dbName: "EntertainmentWebApp" }
).then(() => { console.log("Mongodb is connected") }
).catch((error) => { console.error(error) })

// server listening
module.exports = app
module.exports.handler = serverless(app);
