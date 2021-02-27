const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const genresSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // type: { type: Array, enum: ['Action', 'Horror', 'Adventure', 'Romance'], required: true},
    // releaseDate: { type: Date, default: Date.now },
    // price: { 
    //     type: String, 
    //     required: function() {return this.releaseDate == Date.now }
    // }
})

const Genre = mongoose.model('genre', genresSchema);



function validateGenre(genre) {
    let err = null;
    if(!genre.name){
        err = "Genre is required.";
    }
    else if(genre.name.length < 3){
        err = "Length should be equal or greater than 3."
    }
    return err  
}

async function getGenres(){
    const genres = await Genre
        .find()
        .sort({ name: 1 })
    return genres;
}

router.get('/', async (req, res) => {
    res.send(await getGenres());
});

router.post('/', async (req, res) => {
    const errResult = validateGenre(req.body);
    if(errResult !=null) return res.status(404).send(errResult)

    let genre = new Genre({ name: req.body.name});
    const result = await genre.save();
    res.send(result)
});

router.put('/:id', async (req, res) => {
    try{

    
    const errResult = validateGenre(req.body);
    if(errResult != null) return res.status(400).send(errResult);
    
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name }, {new: true})
    if(!genre) return res.status(404).send("Genre not found.");

    res.send(genre);
    }
    catch(ex){
        res.status(404).send(ex.message);
        console.log('Err', ex.message)
    }
});

router.delete('/:id', async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send("Genre not found.");
    
    res.send(genre);
})

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("Genre not found.");

    res.send(genre);
})

module.exports = router;