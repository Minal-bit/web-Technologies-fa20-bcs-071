const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

modelSchema.index({title: 1, instructor: 1}, {unique: true});
let Model = mongoose.model("Course", modelSchema);
module.exports = Model;
