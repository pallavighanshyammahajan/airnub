const express = require("express");
const router = express.Router();

//index route - post
router.get("/posts", (req, res)=>{
    res.send("Hi, I am route");
});

//show- post
router.get("/posts/:id", (req, res)=>{
    res.send("Hi, I am show route");
})

//post- post
router.post("/posts", (req, res)=>{
    res.send("Hi, I am post route");
})

//delete route- post
router.delete("/posts/:id", (req, res)=>{
    res.send("Hi, I am delete route");
})

module.exports = router;