const mongoose = require("mongoose");

// Connection
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useNewUrlParser: true
});

///////////////////////////////////
////////// Define Schema //////////
///////////////////////////////////

/* const fruitsSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
}); */

const fruitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data, name is mandatory field!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data, name is mandatory field!"]
    },
    age: {
        type: Number,
        min: 1
    },
    favouriteFruit: fruitsSchema
});


//////////////////////////////////
////////// Define Model //////////
//////////////////////////////////

// This will create a new collection "fruits"
const Fruit = mongoose.model("Fruit", fruitsSchema);

// This will create a new collection "people"
const Person = mongoose.model("Person", personSchema);

/////////////////////////////////////////////////
////////// Define & save the documents //////////
/////////////////////////////////////////////////

// Define & save the documents
const apple = new Fruit({
    name: "Apple",
    rating: 8,
    review: "Super fruit"
});

// Save single document
// apple.save();

const orange = new Fruit({
    name: "Orange",
    rating: 6,
    review: "Sour taste, but Vitamin C is there"
});

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 7,
    review: "Rich fruit"
});

const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "Excellent fruit"
});

// Save many documents
/* Fruit.insertMany([kiwi, orange, banana], function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Success");
    }
}); */

const john = new Person({
    name: "John",
    age: 35,
    favouriteFruit: banana
});

// john.save();

// Find documents 
Fruit.find((err, fruits) => {
    if (err) {
        console.log(err);
    } else {
        fruits.forEach((fruit) => console.log(fruit.name));
    }
});

Fruit.updateOne({
    name: "Banana"
}, {
    rating: 9
}, (err) => {
    if (err) {
        console.log("Error");
    } else {
        mongoose.connection.close();
        console.log("Updated successfully");
    }
});