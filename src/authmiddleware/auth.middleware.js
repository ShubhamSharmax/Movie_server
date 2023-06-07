const jwt = require("jsonwebtoken")

const isAdminAuthorized = (req,res, next) => {
    const token = req.headers.authorization;
    console.log(token);

    if(token){
        return res.send("error")
    }

    if(!token){
        return res.send("No token found")
    }

    jwt.verify(token,"shubham", (err, decoded) =>{
        if(err){
            return res.send("user is not Authorized");
        }
        console.log(decoded);

        if(decoded.role == "admin")
        {
            next()
        }
        if(decoded.role !== "admin")
        {
            return res.send("you are not authorized")
        }
    })
}
