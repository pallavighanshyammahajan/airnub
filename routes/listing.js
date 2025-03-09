const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
//first router
router
.route("/")
//index route
.get(wrapAsync(listingController.index))
//create route
.post(isLoggedIn,validateListing,
wrapAsync(listingController.createListing));

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//second router
router
.route("/:id")
//show route
router.get(wrapAsync(listingController.showListing))
//update route
router.put(
isLoggedIn,
isOwner, 
validateListing,
wrapAsync(listingController.updateListing));
//delete route
router.delete(
isLoggedIn,
isOwner, 
wrapAsync(listingController.destroyListing));


//Edit route
router.get("/:id/edit",
 isLoggedIn,
 isOwner, 
  wrapAsync(listingController.editListing))

module.exports = router;