const User = require("../models/user.js");

module.exports.signUp = (req, res)=>{
    res.render("users/signup.ejs");
};

module.exports.rederSignUpForm = async(req, res, next)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User({username, email});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wonderlust");
            res.redirect("/listings");
        })
        }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
}
module.exports.renderLoginForm = (req, res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req, res)=>{
    req.flash("success","welcome back to wonderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res , next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "you are successfully logout");
        res.redirect("/listings");
    })
    
};