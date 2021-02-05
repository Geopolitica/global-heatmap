var Tweet = require("../models/tweet");
const moment = require("moment");

// Display list of all Authors.
exports.tweet_list = function (req, res, next) {
  Tweet.find()
    .limit(10)
    // .sort([["family_name", "ascending"]])
    .exec(function (err, list_tweets) {
      if (err) {
        return next(err);
      }
      res.json(list_tweets);
    });
};

exports.agg_list = function (req, res, next) {
  Tweet.aggregate([
    {
      $match: {
        country_mentions: {
          $ne: null,
          $type: "array",
          $not: {
            $size: 0,
          },
        },
        created_at: {
          $gte: new Date("Thu, 04 Feb 2021 16:01:20 GMT"),
        },
      },
    },
    {
      $unwind: {
        path: "$country_mentions",
      },
    },
    {
      $group: {
        _id: "$country_mentions",
        sum: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        sum: -1,
      },
    },
  ]).exec(function (err, agg_results) {
    if (err) {
      return next(err);
    }
    res.json(agg_results);
  });
};

exports.mentions = function (req, res, next) {
  const now = moment().format();
  const last24Hours = moment(now).add(-24, "hours").format();
  Tweet.aggregate([
    {
      $match: {
        country_mentions: {
          $ne: null,
          $type: "array",
          $not: {
            $size: 0,
          },
        },
        created_at: { $gte: new Date(last24Hours) },
      },
    },
    {
      $unwind: {
        path: "$country_mentions",
      },
    },
    {
      $group: {
        _id: "$country_mentions",
        sum: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        sum: -1,
      },
    },
  ]).exec(function (err, docs) {
    if (err) return next(err);
    res.json(docs);
  });
};

exports.getTweetsByCountry = function (req, res) {
  Tweet.find({ country_mentions: { $all: [req.params.name] } }).exec(function (
    err,
    docs
  ) {
    if (err) return next(err);
    res.json(docs);
  });
};
