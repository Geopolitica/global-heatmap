const express = require("express");
const mongoose = require("mongoose");

const { ObjectId } = require("mongodb");
const router = express.Router();

var tweet_controller = require("./controllers/tweetController");
var map_controller = require("./controllers/mapController");

require("dotenv").config();

// // Mongoose connection to MongoDB
// const DB = process.env.DATABASE;
const DB =
  "mongodb+srv://britt:cZPQe7Hh2Ca8DACv@cluster0.zywmu.mongodb.net/bbc?retryWrites=true&w=majority";

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

// Tweet routes
router.get("/tweets", tweet_controller.tweet_list);

// Map routes
router.get("/mapjson/:name", map_controller.mapJson);
router.get("/maplayers", map_controller.mapLayers);

// Old routes
router.get("/mentions", tweet_controller.mentions);
router.get("/", map_controller.getMap);
router.get("/tweets/:name", tweet_controller.getTweetsByCountry);

// Mongoose Schema definition
// const Schema = mongoose.Schema;

// // const TestSchema = new Schema({
// //   title: String,
// // });

// const JsonSchema = new Schema({
//   name: String,
//   type: Schema.Types.Mixed,
// });

// const TweetSchema = new Schema({
//   vendor_id: Number,
//   created_at: String,
//   text: String,
//   country_mentions: Object,
// });

// // Mongoose Model definition
// const Test = mongoose.model("Test", TweetSchema, "headlines");
// let Json = mongoose.model("JString", JsonSchema, "worldcountries");
// let Tweet = mongoose.model("Tweet", TweetSchema, "tweets");

///// Test Router //////
// router.get("/tweets", tweet_controller.tweet_list);

// router.get("/test", function (req, res) {
//   Test.find({}, function (err, docs) {
//     if (err) return err;
//     res.send(docs);
//     // query.exec(function (err, docs) {
//     //   if (err) return next(err);
//     //   res.send(docs);
//   });
// });

// /* GET mentions from bbc/tweets. */
// router.get("/mentions", function (req, res) {
//   // const query = Mention.find(); //.exec()
//   const query = Tweet.aggregate([
//     {
//       $match: {
//         country_mentions: {
//           $ne: null,
//           $type: "array",
//           $not: {
//             $size: 0,
//           },
//         },
//         created_at: { $gte: new Date(last24Hours) },
//       },
//     },
//     {
//       $unwind: {
//         path: "$country_mentions",
//       },
//     },
//     {
//       $group: {
//         _id: "$country_mentions",
//         sum: {
//           $sum: 1,
//         },
//       },
//     },
//     {
//       $sort: {
//         sum: -1,
//       },
//     },
//   ]);

//   query.exec(function (err, docs) {
//     if (err) return next(err);
//     res.send(docs);
//   });
// });

// /* GET Map page. */
// router.get("/", function (req, res) {
//   Map.find({}, {}, function (e, docs) {
//     res.render("map", {
//       jmap: docs,
//     });
//   }).limit(10);
// });

// /* GET tweets mentioning a specific country - built for objects */
// router.get("/mentions/:name", function (req, res) {
//   if (req.params.name) {
//     Mention.find(
//       { country_mentions: { countryName: { $in: [req.params.name] } } }, // Not currently working
//       function (err, docs) {
//         res.json(docs);
//       }
//     );
//   }
// });

// // Get tweets mentioning a certain topic
// router.get("/topics/:country", function (req, res) {
//   const topic = req.params.country; // .toLowerCase();
//   const query = Mention.find({ topics: { $all: [topic] } });
//   // console.log(typeof req.params.name);
//   query.exec(function (err, docs) {
//     if (err) return next(err);
//     res.send(docs);
//   });
// });

// /* GET json data. */
// // Json.findOne({ properties: { name: req.params.name } });
// router.get("/mapjson/:name", function (req, res) {
//   if (req.params.name) {
//     Json.findOne(
//       { properties: { name: req.params.name } },
//       {},
//       function (err, docs) {
//         res.json(docs);
//       }
//     );
//   }
// });

// /* GET layers json data. */
// router.get("/maplayers", function (req, res) {
//   Json.find({}, function (err, docs) {
//     res.json(docs);
//   });
// });

module.exports = router;
