const express = require("express");
let router = express.Router();
let Course = require("../models/Course");

router.get("/Courses/sessionn", async (req, res) => {
  let sessionn = req.cookies["sessionn"];
  if (!sessionn) sessionn = [];
  let Courses = await Course.find({_id: {$in: sessionn}});
  let total = 0;
  for (let index = 0; index < Courses.length; index++) {
    total += 1;
  }
  return res.render("sessionn", {Courses, total});
});
router.get("/Courses/sessionn/remove/:id", (req, res) => {
  let sessionn = req.cookies["sessionn"];
  if (!sessionn) sessionn = [];

  let index = sessionn.indexOf(req.params.id);
  if (index !== -1) {
    sessionn.splice(index, 1);
  }

  res.cookie("sessionn", sessionn);
  return res.redirect("back");
});

router.get("/Courses/sessionn/add/:id", (req, res) => {
  let sessionn = req.cookies["sessionn"];
  if (!sessionn) sessionn = [];
  sessionn.push(req.params.id);
  res.cookie("sessionn", sessionn);
  return res.redirect("back");
});
router.get("/Courses", async (req, res) => {
  let Courses = await Course.find();
  //   return res.send(Courses);
  res.render("Courses/index", {
    Courses,
    pageTitle: "Top Courses ",
  });
});
router.get("/Courses/addcourse", (req, res) => res.render("Courses/addcourse"));
module.exports = router;
