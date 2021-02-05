var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TweetSchema = new Schema({
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

// // Virtual for author's full name
// AuthorSchema.virtual("name").get(function () {
//   return this.family_name + ", " + this.first_name;
// });

// // Virtual for author's lifespan
// AuthorSchema.virtual("lifespan").get(function () {
//   return (
//     this.date_of_death.getYear() - this.date_of_birth.getYear()
//   ).toString();
// });

// // Virtual for author's URL
// AuthorSchema.virtual("url").get(function () {
//   return "/catalog/author/" + this._id;
// });

//Export model
module.exports = mongoose.model("Tweet", TweetSchema);
