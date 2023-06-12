const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const Course = require("./models/Course");
const methodOverride = require("method-override");


// Connect to MongoDB
mongoose
  .connect("mongodb://0.0.0.0/elearning")
  .then(() => { console.log("Connected to MongoDB"); })
  .catch((err) => { console.error("Error connecting to MongoDB", err); });
   
// Set the view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
// Method override middleware
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => {
  Course.find()
    .then((courses) => {
      res.render("index", {courses});
    })
    .catch((err) => {
      console.error("Error fetching courses", err);
      res.render("error");
    });
});
// Create a new course (POST)
app.post("/courses", (req, res) => {
  // Retrieve course data from the request body
  const {title, description, instructor, price} = req.body;

  const newCourse = new Course({
    title,
    description,
    instructor,
    price,
  });

  newCourse
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error creating course", err);
      res.render("error");
    });
});
// Render the "Add New Course" form
app.get("/courses/new", (req, res) => {
  res.render("newCourse");
});

// Get all courses (GET)
app.get("/courses", (req, res) => {
  Course.find()
    .then((courses) => {
      res.json(courses);
    })
    .catch((err) => {
      console.error("Error fetching courses", err);
      res.status(500).json({error: "Internal server error"});
    });
});

// Get a specific course by ID (GET)
app.get("/courses/:id", (req, res) => {
  const courseId = req.params.id;

  Course.findById(courseId)
    .then((course) => {
      if (!course) {
        return res.status(404).json({error: "Course not found"});
      }
      res.json(course);
    })
    .catch((err) => {
      console.error("Error fetching course", err);
      res.status(500).json({error: "Internal server error"});
    });
});

// Update a specific course by ID (PUT)
app.put("/courses/:id", (req, res) => {
  const courseId = req.params.id;
  const {title, description, instructor, price} = req.body;

  Course.findByIdAndUpdate(
    courseId,
    {title, description, instructor, price},
    {new: true}
  )
    .then((course) => {
      if (!course) {
        return res.status(404).json({error: "Course not found"});
      }
      res.json(course);
    })
    .catch((err) => {
      console.error("Error updating course", err);
      res.status(500).json({error: "Internal server error"});
    });
});

// Delete a specific course by ID (DELETE)
app.delete("/courses/:id", (req, res) => {
  const courseId = req.params.id;

  Course.findByIdAndDelete(courseId)
    .then((course) => {
      if (!course) {
        return res.status(404).json({error: "Course not found"});
      }
      res.json({message: "Course deleted successfully"});
    })
    .catch((err) => {
      console.error("Error deleting course", err);
      res.status(500).json({error: "Internal server error"});
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
