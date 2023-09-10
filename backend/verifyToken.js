
const jwt=require("jsonwebtoken");
const SecretKey='sdskfjaldsfjdsfjdskdslafa';


const verifyToken=(req,res,next)=>{
    const token=req.headers['authorization']
    console.log('token is ',token);

    if(!token)
    {
        res.status(403).send("A token is required for authenticattion");
    }
    else{
        try{
            const decodedToken=jwt.verify(token,SecretKey);
            req.decodedToken=decodedToken
        }
        catch{
            res.json({status:"error",data:"something went wrong"});
        }
    }
    return next();
}

module.exports=verifyToken;