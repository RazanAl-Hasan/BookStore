
const logger=(req,res,next)=>{
    console.log(req.method +" "+ req.protocol +"://"+ req.get('PORT')+req.originalUrl);
    next();
}
module.exports=logger;