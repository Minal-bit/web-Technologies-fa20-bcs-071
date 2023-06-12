const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const {createproduct} = require("./productsoperation");
mongoose
  .connect("mongodb://0.0.0.0/final")
  .then(async() => 
  {
    console.log("connection created");
    await createproduct(50,22.5,30); 
  })
  .catch((err) => 
  {
    console.log(err);
    console.log("error");
  });

app.use(express.json());
app.listen(port);
