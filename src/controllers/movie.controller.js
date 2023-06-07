const Movie = require("../model/movie.model")
const express = require("express");
const router = express.Router();

router.post("/create", async(req,res) =>{
    try {
        const {moviename, catagory, actors} = req.body;
    
        const movie = await Movie.create({moviename, catagory});

        res.send({movie})

    } catch (error) {
        res.send({error:error.message})
    }
})

module.exports = router;