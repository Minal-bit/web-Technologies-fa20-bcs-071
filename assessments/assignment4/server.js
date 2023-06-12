const express = require("express");
let app = express();
const PORT = process.env.PORT || 3000;
var expressLayouts = require("express-ejs-layouts");
var cookieParser = require("cookie-parser");
var session = require("express-session");
app.use((req, res, next) => {
  // res.send("site is down for maintenance");
  console.log(req.url);
  next();
});
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(expressLayouts);
app.use(cookieParser());
app.use(
  session({
    secret: "My Top Secret String",
    cookie: {maxAge: 3600000},
    resave: true,
    saveUninitialized: true,
  })
);
app.use(require("./middlewares/checkSession"));
app.set("view engine", "ejs");
app.use("/", require("./routes/Courses"));
app.use("/", require("./routes/auth"));


app.get("/cookie-test", (req, res) => {
  let visit = req.cookies["page-visits"];
  if (!visit) visit = 1;
  else visit = Number(visit) + 1;
  res.cookie("page-visits", visit);
  return res.send("You Visited: " + visit + " Times");
});
app.get("/", (req, res) => {
  res.render("homepage");
});
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, (error) => {
  if (error) {
    console.error("Error starting the server:", error);
    return;
  }

  console.log("Server started on port", PORT);
});
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0/elearning", {useNewUrlParser: true})
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));
