## Modelling Relationship

### There are two approaches to handle associations

#### Using Refrences(Normalization)

#### Using Embedded Documents(Denormalization)

### Using Refrences

#### Take the example of author and courses. In this approach author and courses are two separate documents and the course document will contain the author id in the author property. But this does not enforce any data integrity contraint or relationship between these two documents like in relational database. For example if we set author to invalid id in the course document Mongo doesn't care about that.

### Embedded Document Approach

#### In this approach we embedd the author document or object inside the course docuemnt or object.

#### If you are coming from the relational db background you might think that the first approach is the better approach but this is not the case with no sql databases.

#### Both approaches have their advantages and disadvantages. What approach you choose depending upon your application and querying requirements. Basically you need trade off between query performance and consistency.

#### In the reference approach if you change the author property it will refelect instantly everywhere but to load the author information you need one extra query everytime. So, here consistency is preferred over performance and vice versa in embedded approach.

#### There is one another approach called the Hybrid approach. Suppose author document has 50 properties so you don't want to populate these 50 properties in every course document.

## Refrencing Documents Implementation

### Course shcema declaration to include author as Id

#### const Course = mongoose.model('Course', new mongoose.Schema({

#### name: String,

#### author: {

#### type: mongoose.Schema.Types.ObjectId,

#### ref: 'Author'

#### #### }

#### }));

### To fetch the detail of author with Course the populate method is used.

#### async function listCourses() {

#### const courses = await Course

#### .find()

#### .populate('author')

#### .select('name author');

#### console.log(courses);

#### }

### To populate only selected properties for author second argument is passed in populate method.

#### async function listCourses() {

#### const courses = await Course

#### .find()

#### .populate('author','name')

#### .select('name author');

#### console.log(courses);

#### }

### If you want to exclude any property of author document use the populate method in the following way :

#### populate('author', 'name -\_id')

## Embedding Document Implementation

### In this approach the course schema should be like this:

#### const Course = mongoose.model('Course', new mongoose.Schema({

#### name: String,

#### author: {

#### type: mongoose.Schema.Types.ObjectId,

#### ref: 'Author'

#### }

#### }));

### To update the author in this case you have to use the following method:

#### async function updateAuthor(courseId) {

#### const course = await Course.findById(courseId);

#### course.author.name = 'Mosh Hemadani'

#### const result = await course.save();

#### console.log(result);

#### }

### Another approach is to directly modify into the database

#### const course = await Course.update({ \_id: courseId }, {

#### $set: {

#### 'author.name': 'John Smith'

#### }

#### })

### To remove the embedded document we need to use the unset operator.

#### async function removeAuthor(courseId) {

#### const course = await Course.update({ \_id: courseId }, {

#### $unset: {

#### 'author': ''

#### }

#### })

#### }

## Using An Array Of SubDocuments

#### const Course = mongoose.model('Course', new mongoose.Schema({

#### name: String,

#### authors: [authorSchema]

#### }));

### To add author use the following method

#### async function addAuthor(courseId, author) {

#### const course = await Course.findById(courseId);

#### const authors = course.authors;

#### authors.push(author)

#### const result = await course.save();

#### console.log(result);

#### }

### For removing the all the authors we can use the $unset method. But for removing the individual author we can use the following method

## Transactions

### npm library fawn can be used to perform transactions. Refer code of rental routes to see how to use fawn.

## ObjectID

### In ObjectID we have 24 characters and each 2 characters represent a byte.So, essentially we have 12 bytes to identify a document uniquely in the MongoDB.

#### firt 4 bytes : represent a timestamp : Time when the document was created so there is no need to create any column like createdAt because timestamp is included in objectId. By the same token if you want to sort your documents based on the creation time you can simply sort them by their objectid property.

#### next 3 bytes : reprsents the machine identifier. Means two different machines we have two different identifier.

#### next 2 bytes : represnts the process identifier.

#### last 3 bytes : represnts the counter. So, If you are in the same machine, in the same process at the same timestamp but generates two different document the counter bytes will be different. Having said that there are very very less chance that you are generated same objectId for two different document.

#### refre objectId.js for code.

## Validating Object Id

### npm i joi-objectid

### Joi.objectId = require('joi-objectid')(Joi);

### customerId = Joi.objectId().required()
