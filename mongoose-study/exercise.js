const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', {useNewUrlParser: true})
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Could not connect to mongodb'));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses1() {
    return await Course
        .find({isPublished: true, tags: 'backend'})
        .sort({name: 1})
        .select({name: 1, author: 1, _id: 0});
}

async function getCourses2() {
    /*    return await Course
            .find({isPublished: true, tags: {$in: ['backend', 'frontend']}})
            .sort({price: -1})
            .select({name: 1, author: 1, _id: 0, price: 1});*/

    // OR

    return await Course
        .find({isPublished: true})
        .or([{tags: 'backend'}, {tags: 'frontend'}])
        .sort('-price')
        .select('name author price');
}

async function getCourses3() {
    return await Course
        .find({isPublished: true})
        .or([
            {price: {$gte: 15}},
            {name: /.*by.*/i}
        ])
        .sort({name: 1})
        .select({name: 1, author: 1, _id: 0, price: 1});
}

async function run() {
    // const courses = await getCourses1();
    // const courses = await getCourses2();
    const courses = await getCourses3();
    console.log(courses);
}

run();
