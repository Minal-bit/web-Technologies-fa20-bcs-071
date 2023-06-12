const express = require("express");
const bcrypt = require("bcryptjs");
let router = express.Router();
let User = require("../models/User");
let sessionAuth = require("../middlewares/sessionAuth.js");
let admin = require("../middlewares/admin");
router.get("/login", (req, res) => {
  res.render("auth/login", {});
});
router.get("/logout", (req, res) => {
  req.session.user = null;
  // req.setFlash("danger", "Logged out!");
  req.session.flash = { type: "success", message: "Logged Out Successfully!" };
  res.redirect("/");
});
router.post("/login", async (req, res) => {
  let user = await User.findOne({email: req.body.email});
  if (!user) {
    req.setFlash("danger", "User with this email not present");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    req.setFlash("success", "Logged in Successfully");
    return res.redirect("/");
  } else {
    req.setFlash("danger", "Invalid Password");
    return res.redirect("/login");
  }
});
router.get("/register", (req, res) => {
  res.render("auth/register");
});
router.post("/register", async (req, res) => {
  try {
    let userObj = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(userObj.password, salt);
    userObj.password = hashed;
    let user = new User(userObj);
    await user.save();
    res.redirect("/login");
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      req.setFlash("danger", "email already exist");
      res.redirect("/register");
    } else {
      // Other errors
      res.status(500).send("Internal server error");

    }
  }
});


router.get("/profile", sessionAuth, async (req, res) => {
  //this route should be protected
  res.render("auth/profile");
});
router.get("/admin-profile", sessionAuth, admin, async (req, res, next) => {
  //this route should be protected
  res.render("auth/admin-profile");
  // next();
});
router.post("/edit_profile", sessionAuth, async (req, res) => {
  try {
    // Retrieve the updated information from req.body
    const {name, email} = req.body;

    // Retrieve the user from the session
    const userId = req.session.user._id;

    // Update the user's profile in the database
    await User.findByIdAndUpdate(userId, {name, email});

    // Redirect the user to the profile page or show a success message
    req.setFlash("success", "Profile updated successfully");
    res.redirect("/profile");
  } catch (err) {
    // Handle any errors that occur during the update process
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
