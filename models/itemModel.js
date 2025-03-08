const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Item = new Schema({
  items: [
    {
      item: { type: String },
      count: { type: String },
    },
  ],
});

module.exports = mongoose.model("item", Item);
