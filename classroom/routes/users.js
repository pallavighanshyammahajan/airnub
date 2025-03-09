const express = require("express");
const router = express.Router();

//index route - users
router.get("/", (req, res)=>{
    res.send("Hi, I am route");
});

//show- users
router.get("/:id", (req, res)=>{
    res.send("Hi, I am show route");
})

//post- users
router.post("/", (req, res)=>{
    res.send("Hi, I am post route");
})

//delete route- users
router.delete("/:id", (req, res)=>{
    res.send("Hi, I am delete route");
})

module.exports = router;