## Authentication And Authorization

### Authentication

#### Authentication is the process of identifying users whom they claim they are.

### Authorization

#### Authorization is determining if the user has right permission to perform the given operation.

#### In this vidy application only authenticated user can modify data. If the user is anonymous or not logged in they can only read data from the end points. If they want to create new Genre or update a movie they need to be authenticated first.

### And only Admin user can delete the data.

### We need to create the following end points for the above requirement.

#### Register: POST /api/users

#### Login: POST /api/logins

### Lodash Library

#### Optimised version of underscore library which gives utility to work with Js objects.

#### const _ = require('lodash');
#### user = new User(_.pick(req.body, ['name', 'email', 'password']));
####  res.send(_.pick(user, ["_id", "name", "email"]));

### Joi Password Complexity

#### this npm package can be installed to describe the password complexity.


### Hashing Password

#### bcrypt library can be used to hash the password.

#### to hash any password we need a salt. A salt is basically a random string that is added before or after this password so that resulting password is different each time depending upon the salt that is being used.

##### refer hash.js for implemetation

### Authenticating Users

##### compare method is used for authentication. see auth route.

### JSON web token

#### You can think of a long string that identifies a user. In web applications we can store jwt in local storage and you have similar option in mobile applications as well.

#### The home page for Json Web Token is https://jwt.io

#### npm i jsonwebtoken

### Storing Secrets In Environment Variables

### To set the evironment variable in c powershell : $env:vidly_jwtPrivateKey="test"

### Setting Response Header

##### const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
##### res.header('x-auth-token', token).send(_.pick(user, ["_id", "name", "email"]));

### Encapsulating Login in Mongoose Model

#### userSchema.methods.generateAuthToken = function () {
####    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
####    return token;
#### }

### Authorization Middleware

#### refer middleware auth.js

### Protecting Routes

#### see genre post method.

### Getting the current user




