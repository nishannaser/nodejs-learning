const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected to database "playground"'))
    .catch(err => console.error('Could not connect to mongodb'));

// =====================================================================================================================

// Schema without validations
/*
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});
*/

// Schema with validations
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true
        // uppercase: true,
        // trim: true
    },
    tags: {
        type: Array,
        // Custom validation
        validate: {
            validator: function (v) {
                // Array should not be null & should not be empty
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 200
        // get: v => Math.round(v),
        // set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

// =====================================================================================================================

async function createCourse() {
    const course1 = new Course({
        name: 'Angular course',
        author: 'Mosh Hamedani',
        category: 'web',
        tags: ['angular', 'frontend'],
        price: 10,
        isPublished: true
    });

    try {
        const result = await course1.save();
        console.log(result);
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
}

// =====================================================================================================================

async function getCourses() {
    const courses = await Course
        .find({ author: 'Mosh Hamedani' })

        // Comparison Operators
        // .find({price: {$gt: 10}})
        // .find({price: {$gte: 10, $lte: 20}})
        // .find({price: {$in: [10, 15, 20]}})

        // Logical Operators
        // .find()
        // .or([{author: 'Mosh Hamedani'}, {isPublished: true}])

        // Regular expression
        // .find({author: /^Mosh/})
        // .find({author: /Mosh$/i})
        // .find({author: /.*Mosh.*/i})

        .limit(10)

        // Pagination
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)

        .sort({ name: 1 })
        .select({ name: 1, tags: 1, _id: 0 });
    console.log(courses);
}

// =====================================================================================================================

async function updateCourses(id) {
    // Query first approach
    // ~~~~~~~~~~~~~~~~~~~~
    // const course = await Course.findById(id);
    // if (!course) return;

    // course.author = 'Nishan Naser';
    // course.isPublished = false;

    // const result = await course.save();
    // console.log(result);

    // Update first approach
    // ~~~~~~~~~~~~~~~~~~~~~
    // const result = await Course.update({ _id: id }, {
    //     $set: {
    //         name: 'Some Author',
    //         isPublished: false
    //     }
    // });
    // console.log(result);

    const course = await Course.findByIdAndUpdate({ _id: id }, {
        $set: {
            name: 'Some Author',
            isPublished: false
        }
    }, { new: true });
    console.log(course);
}

// getCourses();
createCourse();
// updateCourses('5ea39acd02d8b92ad8ec37eb');

