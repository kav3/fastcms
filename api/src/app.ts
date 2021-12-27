require('dotenv').config();
import express from "express";
import cors from "cors"
import routes from "./routes"
import { notFound, errorHandler } from "./middlewares"
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI).then(
  () => {
    console.log('MongoDB Connected');
  },
).catch(err => {
  console.log(`MongoDB connection error. ${err}`);
  // process.exit();
});

// const morgan = require('morgan');
// const helmet = require('helmet');
// const cors = require('cors');

const app = express();

// app.use(morgan('dev'));
// app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

app.use('/api/v1', routes);

app.use(notFound);
app.use(errorHandler);

// module.exports = app;

export default app