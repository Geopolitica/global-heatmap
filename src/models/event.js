const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  article_link: String,
  country_mentions: Array,
  created_at: Date,
  favourite_count: Number,
  hashtags: Array,
  interactions_per_minute: Number,
  last_updated_at: Date,
  retweet_count: Number,
  text: String,
  topics: Array,
  total_interactions: Number,
  user: String,
});

// Future: Add Virtuals for some fields

//Export model
module.exports = mongoose.model("Event", EventSchema, "tweets");
