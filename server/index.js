const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require(`./routes/auth`)
const eventRoutes = require('./routes/events')
const bookingRoutes = require('./routes/bookings')

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

//connect to mongoDB
mongoose.connect(process.env.MONGODB_URL, {
}).then(() => {
    console.log("MongoDB Connected Successfully");
}).catch((err) => {
    console.log(err.message);
}); 


// const PORT = 5000;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Is Running on  Port ${PORT}`);
    
})