const express = require('express');
const router = express.Router();

const courses = [
    {
        'id': 1,
        'name': 'course1'
    }
];

// =====================================================================================================

// GET courses
router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (course) {
        return res.status(200).send(course);
    } else {
        return res.status(404).send('Requested course not found');
    }
});

// CREATE courses
router.post('/', (req, res) => {
    // Validation
    const {error} = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// UPDATE courses
router.put('/:id', (req, res) => {
    // Validation
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('Requested course not found');
    }

    const {error} = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);
});

// DELETE course
router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('Requested course not found');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    return course;
});

function validateCourse(course) {
    // Input validation using Joi
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

// =====================================================================================================

// EXPORT
module.exports = router;