const express = require("express");
const mongoose = require("mongoose");

const { ObjectId } = require("mongodb");
const router = express.Router();

const event_controller = require("./controllers/eventController");
const map_controller = require("./controllers/mapController");

require("dotenv").config({ debug: process.env.DEBUG });

// // Mongoose connection to MongoDB
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => console.log("DB connection successful! 🎉"))
  .catch("Error");

mongoose.set("debug", true);

router.get("/", map_controller.getMap);

// Event routes
router.get("/events", event_controller.event_list);
router.get("/mentions", event_controller.mentions);
router.get("/events/:name", event_controller.getEventsByCountry);

// Map routes
router.get("/mapjson/:name", map_controller.mapJson);
router.get("/maplayers", map_controller.mapLayers);

module.exports = router;
