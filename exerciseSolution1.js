const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sampleuser:sampleuser@cluster0.etifr.mongodb.net/exercisedb?retryWrites=true&w=majority')
    .then(() => console.log('Connected to Mongo DB....'))
    .catch((err) => console.log(err.message));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: String, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

//Get all the publish backend courses, sort them by name, pick only their name and author and display them

async function getFirstQuery() {
    try {
        const result = await Course.find({ isPublished: true, tags: 'backend' })
            .sort({ name: 1 })
            .select({ name: 1, author: 1 });
        console.log(result);
    } catch (err) {
        console.log()
    }
}

// Get all the published frontend or backend courses, sort them by theri price in decending order, pick only name and author and display them

async function getSeondQuery() {
    try {
        const result = await Course.find({ isPublished: true })
            .or([{ tags: 'frontend' }, { tags: 'backend' }])
            .sort({ price: -1 })
            .select({ name: 1, author: 1 });
        console.log(result);
    } catch (err) {
        console.log()
    }
}

// Get all the publish courses that are $15 or more or have the word 'by' in their title

async function getThirdQuery() {
    try {
        const result = await Course.find({ isPublished: true })
            .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
        console.log(result);
    } catch (err) {
        console.log()
    }
}

//getFirstQuery();

//getSeondQuery();

getThirdQuery();