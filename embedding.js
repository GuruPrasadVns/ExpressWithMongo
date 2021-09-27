const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sampleuser:sampleuser@cluster0.etifr.mongodb.net/modellingdb?retryWrites=true&w=majority')
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
  // const course = await Course.findById(courseId);
  // course.author.name = 'Mosh Hemadani'
  // const result = await course.save();
  // console.log(result);

  // To directly modify in the database
  const course = await Course.update({ _id: courseId }, {
    $set: {
      'author.name': 'John Smith'
    }
  })
}

async function removeAuthor(courseId) {
  const course = await Course.update({ _id: courseId }, {
    $unset: {
      'author': ''
    }
  })
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));

removeAuthor('61517983191efa1f00552fad');
