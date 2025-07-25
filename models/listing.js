
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        // type: String,
        // default: "https://images.unsplash.com/photo-1521747116042-5a810fda9664", // Use a valid image URL
        // set: (v) => v.trim() || "https://images.unsplash.com/photo-1521747116042-5a810fda9664", // Ensures no empty strings
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    owner:
        {
            type:Schema.Types.ObjectId,
            ref: "User",
        },
    
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
         },
    coordinates: {
        type: [Number],
        required: true,
    },
},
    
    
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({ _id: { $in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;