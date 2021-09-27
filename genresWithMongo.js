const express = require('express');
const Joi = require('joi');
const Genre = require('./schemas/GenreSchema');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await Genre.find();
        res.send(result)
    } catch (err) {
        console.log('Error:', err.message);
    }

});

router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById({ _id: req.params.id });
        if (!genre) return res.status(404).send(`Genre with given ID ${req.params.id} not found`);
        res.send(genre);
    } catch (err) {
        console.log('Error:', err.message);
    }

});

router.post('/', async (req, res) => {
    try {
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const genre = new Genre({
            name: req.body.name
        });
        const result = await genre.save();
        res.send(result);
    } catch (error) {
        console.log('Error:', error.message);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById({ _id: req.params.id });
        if (!genre) return res.status(404).send(`Genre with given ID ${req.params.id} not found`);
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        genre.name = req.body.name;
        await genre.save();
        res.send(genre);
    } catch (error) {
        console.log('Error:', error.message);
    }

})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send(`Genre with given ID ${req.params.id} not found`);
    res.send(genre);
})



function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required()
    })
    return schema.validate({ name: genre.name })
}

module.exports = router;


