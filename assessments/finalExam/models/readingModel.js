const mongoose = require("mongoose");

const readingschema = mongoose.Schema(
    {
        max:Number,
        min:Number,
        average:Number
    }
);

const readingModel = mongoose.model("VoltageReading",readingschema);
module.exports = readingModel;