const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");

//1 router
router
.route("/signup")
.get(userController.signUp)
.post(wrapAsync(userController.rederSignUpForm));

//2 router
router
.route("/login")
.get( userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash: true,
    }),
    userController.login
   
);


router.get("/logout", userController.logout);

module.exports = router;