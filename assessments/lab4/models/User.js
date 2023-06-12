const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  name: {type: String, require: true},
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {type: String, require: true},
  role: [],
});
let Model = mongoose.model("User", modelSchema);
module.exports = Model;
