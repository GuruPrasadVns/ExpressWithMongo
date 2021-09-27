const { required } = require('joi');
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sampleuser:sampleuser@cluster0.etifr.mongodb.net/mySecondDB?retryWrites=true&w=majority')
    .then(() => console.log('Connected to Mongo DB....'))
    .catch((err) => console.log(err.message));

// Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        //match: /regex/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    isPublished: Boolean,
    price: {
        type: Number, required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 200
    },
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            }
        },
        message: 'A course should have at least one tag'
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    try {
        // const course = new Course({

        // });
        // const course = new Course({
        //     isPublished: true
        // });
        // const course = new Course({
        //     name: 'Angular Course',
        //     category: '-',
        //     isPublished: true,
        //     price: 15
        // });

        const course = new Course({
            name: 'Angular Course',
            category: '-',
            isPublished: true,
            price: 15,
            tags: []
        });
        const result = await course.save();
        console.log(result);
    } catch (err) {
        for (field in err.errors) {
            console.log(err.errors[field].message)
        }
    }
}

createCourse();

