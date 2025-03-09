// utils folder me extra chize h jese error class, wrap asyc or etc.

//wrapAsync function ko direct module.export bhi kar askte h isiliye direct module.export karege fuction name nahi denge

module.exports = (fn) =>{
    return (req, res, next) =>{
        fn(req, res, next).catch(next);
    }
}