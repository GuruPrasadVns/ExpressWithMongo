const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId;

console.log(id);

// To get the timestamp from objectId

console.log(id.getTimestamp());

// to check object id is valid or not

const isNotValid = mongoose.Types.ObjectId.isValid('1234')
console.log(isNotValid)

const isValid = mongoose.Types.ObjectId.isValid('6152a97ab76608736207cf3b')
console.log(isValid)