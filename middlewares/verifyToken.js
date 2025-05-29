const jwt=require("jsonwebtoken");

//verify Token
function verifyToken(req,res,next){
const token=req.headers.token;
if(token){
try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)//verify fun get bayload of jwt
req.user=decoded;
next();
} catch (error) {
    res.status(401).json({message:"invalid token"});
}
}else {
res.status(401).json({message:"no token provided"});
}
}
// verify Token & Authorize the user
function verifyTokenAndAuthorizeTheUser( req, res,next){
verifyToken(req,res ,()=>{
    if(req.user._id === req.params.id || req.user.isAdmin){
        next();
    }else{
        res.status(403).json({message:"you are not allowed "});
    }
});
}

//verify token and admin 
function verifyTokenAndAdmin( req, res,next){
verifyToken(req,res , ()=>{
    if(req.user.isAdmin){
        next();
    }else{
        res.status(403).json({message:"you are not allowed, only admin allowed"});
    }
});
}
module.exports={
    verifyToken,
    verifyTokenAndAuthorizeTheUser,
    verifyTokenAndAdmin
}