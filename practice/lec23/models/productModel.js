const mongoose = require("mongoose");

const productschema = mongoose.Schema(
    {
        max:Number,
        min:Number,
        average:Number
    }
);

const productModel = mongoose.model("VoltageReading",productschema);
module.exports = productModel;