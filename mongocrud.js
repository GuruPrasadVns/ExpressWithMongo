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

async function createCourse() {

    try {
        const course = new Course({
            name: 'Angular Course',
            author: 'Mosh',
            tags: ["angular", "frontend"],
            isPublished: true,
            price: 15

        });
        const result = await course.save();
        console.log(result);
    } catch (error) {
        console.log(error.message)
    }

}

async function getCourses() {
    try {
        const courses = await Course.find();
        console.log(courses);
    } catch (error) {
        console.log(error.message)
    }
}

async function getFilteredCourses() {
    try {
        //const courses = await Course.find({ author: 'Mathew' });
        const courses = await Course.find({ isPublished: false });
        console.log(courses);
    } catch (error) {
        console.log(error.message)
    }
}

async function getLimitedAndSortedCourses() {
    try {
        const courses = await Course.find().limit(3).sort({ author: 1 })
        console.log(courses);
    } catch (error) {
        console.log(error.message)
    }
}

async function getLimitedAndSortedCoursesWithSelectedValue() {
    try {
        const courses = await Course.find().limit(3).sort({ name: 1 }).select({ title: 1, isPublished: 1 })
        console.log(courses);
    } catch (error) {
        console.log(error.message)
    }
}

async function comparisonAndLogicalOperatorExample() {
    try {
        //find course with price equal to 2100
        //const courses = await Course.find({ price: 2100 })
        //find course with price greater than 1500
        //const courses = await Course.find({ price: { $gt: 1500 } })
        //find course with price greater than 1500 and less than 2100
        //const courses = await Course.find({ price: { $gt: 1500, $lt: 2100 } })
        //find course with price greater than 1500 or 2000 or 2100
        //const courses = await Course.find({ price: { $in: [1500, 2000, 2100] } })
        //find course with price equal to 1500 or author is Adam.
        const courses = await await Course.find().or([{ price: 1500 }, { author: 'Adam' }])
        // similar construct we can use for and operators
        console.log(courses);
    } catch (error) {
        console.log(error.message)
    }
}

async function updateCourseByQueryFirst(id) {
    try {
        // Approach : queryFirst
        const course = await Course.findById(id);
        if (!course) return;
        // first way to update the property

        course.isPublished = false;
        course.author = 'Another Author'

        // second way to update the properties

        // course.set({
        //     isPublished : false,
        //     author: 'Another author'
        // })

        const result = await course.save();
        console.log(result);

    } catch (error) {
        console.log(error.message)
    }

}

async function updateCourseByUpdateFirst(id) {
    try {
        // Approach : udpateFirst
        // const result = await Course.update({ _id: id }, {
        //     $set: {
        //         isPublished: false,
        //         author: 'Another Author1'
        //     }
        // })
        // const result = await Course.findByIdAndUpdate(id, {
        //     $set: {
        //         isPublished: true,
        //         author: 'Another Author2'
        //     }
        // })

        const result = await Course.findByIdAndUpdate(id, {
            $set: {
                isPublished: false,
                author: 'Another Author3'
            }
        }, { new: true })
        console.log(result);

    } catch (error) {
        console.log(error.message)
    }

}

async function removeCourse(id) {
    try {
        //const result = await Course.deleteOne({ _id: id });
        const course = await Course.findByIdAndRemove(id);
        //console.log(result);
        console.log(course);
    } catch (error) {
        console.log(error.message)
    }
}
//createCourse();

//getCourses();

//getFilteredCourses();

//getLimitedAndSortedCourses();

//getLimitedAndSortedCoursesWithSelectedValue();
//comparisonAndLogicalOperatorExample();

// updateCourseByQueryFirst('614dbd5bdc13ffd86a65b1f1');

//updateCourseByQueryFirst('614dbd5bdc13ffd86a65b1f1');

// updateCourseByUpdateFirst('614dbd5bdc13ffd86a65b1f1')

removeCourse('614dbd5bdc13ffd86a65b1f1')

