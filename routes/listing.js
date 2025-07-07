const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn , isOwner, validateListing} = require("../middleware.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const listingController = require("../controllers/listings.js");
//first router
router
.route("/")
//index route
.get(wrapAsync(listingController.index))
//create route
.post(isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
  );


//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//second router
router
.route("/:id")
//show route
.get(wrapAsync(listingController.showListing))
//update route
.put(
isLoggedIn,
isOwner, 
upload.single('listing[image]'),
validateListing,
wrapAsync(listingController.updateListing))
//delete route
.delete(
isLoggedIn,
isOwner, 
wrapAsync(listingController.destroyListing));


//Edit route
router.get("/:id/edit",
 isLoggedIn,
 isOwner, 
  wrapAsync(listingController.editListing))

module.exports = router;