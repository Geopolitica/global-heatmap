const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");

require("dotenv").config();

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

// Mongoose Schema definition
const Schema = mongoose.Schema;

const JsonSchema = new Schema({
  name: String,
  type: Schema.Types.Mixed,
});

const MentionSchema = new Schema({
  vendor_id: Number,
  created_at: String,
  text: String,
  country_mentions: Object,
});

// Mongoose Model definition
let Json = mongoose.model("JString", JsonSchema, "worldcountries");
let Mention = mongoose.model("Mentions", MentionSchema, "tweets");

const now = moment().format();
const last24Hours = moment(now).add(-24, "hours").format();
console.log(last24Hours);

/* GET mentions from bbc/tweets. */
router.get("/mentions", function (req, res) {
  // const query = Mention.find(); //.exec()
  const query = Mention.aggregate([
    {
      $match: {
        country_mentions: { $type: "object", $ne: null },
        created_at: { $gte: new Date(last24Hours) },
      },
    },
    {
      $group: {
        _id: "$country_mentions.countryName",
        count: { $sum: 1 },
      },
    },
  ]);

  query.exec(function (err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
});

/* GET Map page. */
router.get("/", function (req, res) {
  Json.find({}, {}, function (e, docs) {
    res.render("map", {
      jmap: docs,
    });
  }).limit(10);
});

/* GET tweets mentioning a specific country - built for objects */
router.get("/mentions/:name", function (req, res) {
  if (req.params.name) {
    Mention.find(
      { country_mentions: { countryName: { $in: [req.params.name] } } }, // Not currently working
      function (err, docs) {
        res.json(docs);
      }
    );
  }
});

// Get tweets mentioning a certain topic
router.get("/topic/:name", function (req, res) {
  // const query = Mention.find(); //.exec()
  const topic = req.params.name.toLowerCase();
  const query = Mention.find({ topics: { $all: [topic] } });
  // console.log(typeof req.params.name);
  query.exec(function (err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
});

/* GET tweets mentioning a specific country - built for arrays */
router.get("/country/:name", function (req, res) {
  const query = Mention.find({ country_mentions: { $all: [req.params.name] } });

  query.exec(function (err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
});

/* GET json data. */
// Json.findOne({ properties: { name: req.params.name } });
router.get("/mapjson/:name", function (req, res) {
  if (req.params.name) {
    Json.findOne(
      { properties: { name: req.params.name } },
      {},
      function (err, docs) {
        res.json(docs);
      }
    );
  }
});

/* GET layers json data. */
router.get("/maplayers", function (req, res) {
  Json.find({}, function (err, docs) {
    res.json(docs);
  });
});

module.exports = router;
