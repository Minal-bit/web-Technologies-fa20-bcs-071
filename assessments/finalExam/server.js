const express = require("express");
const app = express();
const port = 3001;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0/final")
  .then(async () => {
    console.log("connection created");
  })
  .catch((err) => {
    console.log(err);
    console.log("error");
  });

const {getAllreadings, createnew , deletereadings} = require("./readingsOperations");

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) =>
{
    readings = await getAllreadings();
      res.render("index",readings);
  
 });
app.get("/new", (req, res) => {
  res.render("new");
});
app.post("/add", async (req, res) => {
  const {min, max, average} = req.body;

  try {
    const newReading = await createnew(max, min, average);
    res.json(newReading);
  } catch (error) {
    res.status(500).json({error: "Failed to add new reading"});
  }
});
app.get("/delete/:id", async (req, res) => {
  const {id} = req.params; // Remove .id from req.params.id

  try {
    await deletereadings(id);
    res.redirect("/"); // Redirect instead of using window.location.href
  } catch (error) {
    res.status(500).json({error: "Failed to delete reading"});
  }
});


app.use(express.json());
app.listen(port);
console.log("Server listening on port " + port);
// Other server configurations and routes...


