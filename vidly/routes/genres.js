const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

// Get
router.get('/', async (req, res) => {
    throw new Error('Could not get genres');
    const genres = await Genre.find();
    res.send(genres);
});

// Create Genre: with auth MW function to validate authenticated users
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let genre = new Genre({ name: req.body.name });
        genre = await genre.save();
        res.send(genre);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

// Update
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

// Delete Genre : Passing 2 MW functions here
router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');
    res.send(genre);
});

module.exports = router;
