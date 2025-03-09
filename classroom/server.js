const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs" );
app.set("views", path.join( __dirname, "views"));
// EXPRESSION SESSION

const sessionOption = ({secret:"mysupersession", 
resave:false,
saveUninitialized: true,
});

app.use(session(sessionOption));
app.use(flash());

app.use((req ,res, next)=>{
    res.locals.successMsg = req.flash("successful");    
    res.locals.errMsg = req.flash("error"); 
    next();
})

app.get("/register", (req, res)=>{
    let {name = "Anonymous"}  = req.query;
    req.session.name = name;
    if(name === "Anonymous"){
        req.flash("error", "user not registerd");
    }else{
        req.flash("successful", "user registerd successfully");
    
    }
    
    // console.log(req.session.name);
    res.redirect("/hello");
})

app.get("/hello", (req, res)=>{
    res.render("page.ejs", {name: req.session.name});
})


// app.get("/test", (req, res) =>{
//     res.send("test succesfull");
// })

// app.get("/request", (req,res) => {
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`you sent request ${req.session.count} times`);
// })

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res)=>{
//     res.cookie("made-in", "India", {signed: true});
//     res.send("singed cookie send");
// })

// app.get("/verify", (req, res)=>{
//     console.log(req.cookies);
//     console.log("verified");

// })

// app.get("/getcookies", (req, res)=>{
//     res.cookie("greet", "hello!");
//     res.cookie("madein", "India");
//     res.send("cookies sent");
// })

// app.get("/greet", (req,res)=>{
//     let {name="anonyms"} = req.cookies;
//     res.send(`hi, ${name}`);
// })

// app.get("/", (req, res)=>{
//     console.dir(req.cookies);
//     res.send("cookie is sent");
// })

// app.get("/", (req, res)=>{
//     res.send("hi i am route home");
// })

// app.use("/users", users);
// app.use("/posts", posts);




app.listen(3000, ()=>{
    console.log("server is start at 3000");
})