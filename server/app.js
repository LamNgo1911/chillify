require('dotenv').config();
// async errors
require('express-async-errors');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
// middleware
const corsOptions ={
    origin:'https://bespoke-frangollo-b3a1d3.netlify.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://bespoke-frangollo-b3a1d3.netlify.app');
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.json());
// user routes
const userRoutes = require('./routes/auth');
app.use('/api/v1/auth', userRoutes);
// songs routes
const songsRoutes = require('./routes/songs');
app.use('/api/v1/chart', songsRoutes);
// albums routes
const albumsRoutes = require('./routes/albums');
app.use('/api/v1/chart', albumsRoutes);
// artists routes
const artistsRoutes = require('./routes/artists');
app.use('/api/v1/chart', artistsRoutes);

// error handler middleware and not found middleware
const notFound = require('./middleware/not-found');
app.use(notFound);
const errorHandler = require('./middleware/error');
app.use(errorHandler);

// connect to db
const connectDB = require('./config/db');
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
}
start();



