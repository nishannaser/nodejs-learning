const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: authorSchema
}));

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateAuthor(courseId) {
    // let course = await Course.findById(courseId);
    // course.author.name = 'Mosh Hamedani';
    // await course.save();

    await Course.update({ _id: courseId }, {
        $set: {
            'author.name': 'Nishan Naser'
        }
    });

    await listCourses();
}

// createCourse('Node Course', new Author({ name: 'Mosh' }));
updateAuthor('5ea4f47089c82435446e7c05');