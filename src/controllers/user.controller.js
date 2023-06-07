const User = require("../model/user.model")
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async(req,res) =>{
    try {
        let user = await User.find({email:req.body.email});
        if(!user){
            res.send("User is not Registered!! Please Register")
        }

        const compare = bcrypt.comparSync(req.body.password, user[0].password);

        const payload = {userId:user._id, role:user.role};

        const token = jwt.sign(payload, "shubham", {
            expiresIn:"1h"
        })

        if(!compare){
            res.send("Incorrect Password");
        }
        console.log("compare",compare);
        return res.send({message:"Logged In Successfully",token})
    } catch (error) {
        return res.status(400).send({error:ErrorEvent.message})
    }
})

router.post("/register",
body("name")
.not()
.isEmpty()
.withMessage("Name is required")
.isLength({min:3, max:18})
.withMessage("Name should be minimum 3 character long")
,async (req,res) =>{
    try {
        
        const errors = validationResult(req);
        console.log(errors)

        if(!error.isEmpty()){
            let newError;
            console.log("newError", newerror);
            newError = errors.array().map((err) => {
                return {key:err.pram, message:err.msg}
            })
        }

        let register = await User.findOne({email:req.body.email});

        if(register){
            return res.send("User is already registered!! Please use Login");
        }

        let user = await User.create(req.body);

        return res.status(200).send(user);
    } catch (error) {
        return res.status(400).send({error: error.message});
    }
})

module.exports = router;
