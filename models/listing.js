// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type:String,
//         required:true,
//     },
//     description: String,
//     image: {
//         type:String,
//         default:"https://www.istockphoto.com/photo/manali-town-gm589538028-101262263?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fnature&utm_medium=affiliate&utm_source=unsplash&utm_term=nature%3A%3A%3A",
//         set: (v) =>
//             v === ""
//             ?"https://www.istockphoto.com/photo/manali-town-gm589538028-101262263?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fnature&utm_medium=affiliate&utm_source=unsplash&utm_term=nature%3A%3A%3A"
//             :v,
//     },

//     price: Number,
//     location :String,
//     country: String,
// })

// const Listing = mongoose.model("Listing", listingSchema);
// module.exports = Listing;

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
        type: String,
        default: "https://images.unsplash.com/photo-1521747116042-5a810fda9664", // Use a valid image URL
        set: (v) => v.trim() || "https://images.unsplash.com/photo-1521747116042-5a810fda9664", // Ensures no empty strings
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
    
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({ _id: { $in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;