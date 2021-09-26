# ExpressWithMongo

## This repository can be used to learn RESTful services using express and mongodb.

### Mongo DB

#### Mongo DB is a document database or no sql database. In Mongo DB we don't have concepts like relation, schema , tables, views, columns. Here, you simply store your JSON object.

### Connection to Mongo DB

#### To work with Mongo DB we need to install mongoose. mongoose give simple API to interact with Mongo DB.

#### npm i mongoose@5.0.1

### For connecting to mongodb use the following code

##### mongoose.connect('mongodb+srv://<username>:<password>@cluster0.lejwy.mongodb.net/playground?retryWrites=true&w=majority')

##### .then(() => console.log('Connected to Mongo DB....'))

##### .catch(() => console.log('Error in connecting Mongo DB....'));

### Schemas

#### After connecting to Mongo DB we need to create a Schema. Schema used to create the shape of the document within a collection of MongoDB. Document is mongo is similar to the row in relational database. collection is similar to table.

#### Schema is the part of mongoose and not of the mongo db.

##### const courseSchema = new mongoose.Schema({

##### name: String,

##### author: String,

##### tags: [String],

##### date: { type: String, default: Date.now },

##### isPublished: Boolean

##### });

#### Schema types : String, Number, Date, Buffer, Boolean, ObjectID, Array

### Models

#### If Schema is a class then Model is an object. Schema needs to be compiled to Model.

##### const Course = mongoose.model('Course', courseSchema);

##### const course = new Course({

##### name: 'NodeJs Course',

##### author: 'Mosh',

##### tags: ['node', 'backend'],

##### isPublished: true

##### });

### Saving a Document

#### async function createCourse() {

#### try {

#### const Course = mongoose.model('Course', courseSchema);

#### const course = new Course({

#### name: 'Express Course',

#### author: 'Stephen',

#### tags: ['node', 'backend'],

#### isPublished: false

#### });

#### const result = await course.save();

#### console.log(result);

#### } catch (error) {

#### console.log(error.message)

#### }

#### }

## Querying A Document

### refer index.js

## Comparison Query Operators

### eq for equal

### ne for not equal

### gt for greater than

### gte for greater than or equal to

## lt for less than

## lte for less than or equal to

## in for in

## nin for not in

## Logical Query Operators

### or and and

## Regular Expression

### author starts with Mosh

#### .find({author: /^Mosh/})

### author starts with Hemadani

#### .find({author: /^Hemadani$/})

### The above two queries are case sensitive if you want to make them case insensitive

#### .find({author: /^Hemadani$/i})

### author name contains the name Mosh

#### .find({author: /.\*Mosh.\*/i})

## Counting

#### .count() method is used

## Pagination

### skip method is used

#### pageNumber = 2

#### pageSize = 10;

#### .skip((pageNumber - 1) \* pageSize)

#### .limit(pageSize)

### Exercise

#### refer exerciseSolution1.js

### Updating The Document

#### First approach is called queryFirst approach :

##### a) findbyId

##### b) modify its properties

##### c) save

#### Second approach is called updateFirst

##### we connect to the document in database and update directly and optionally we can get the updated docuemnt as well.

##### For this we can use mongo db update operators sepcified in the following url :https://docs.mongodb.com/manual/reference/operator/update/. For direct update $set operator is used. See example

##### If you want to find the original document before the updated value then use findByIdAndUpdate method.If you want the updated document then pass new object with property new and set it to true. See example

### Removing Document

#### deleteOne method is used to delete the document. If you want to remove multiple document at once use deleteMany method.

### If you want to get the removed document use method findByIdAndRemove method. If the document is already deleted this method will return null;
