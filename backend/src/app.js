// importing installed packages 
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors')

// importing routes 
const { bookmarkRouter } = require('./routes/bookmark.routes.js')
const { mediaRouter } = require('./routes/media.routes.js')
const { userRouter } = require('./routes/user.routes.js')

// app instances 
const app = express();


dotenv.config();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log(process.env.FRONTEND_URL);
app.use(cors({
    origin: `https://frontend-part-entertainment-app.vercel.app`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


// routes 
app.use("/api", bookmarkRouter);
app.use("/api", mediaRouter);
app.use("/api", userRouter);

// home route 
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to home route "
    })
})

// exporting 
module.exports = { app }

