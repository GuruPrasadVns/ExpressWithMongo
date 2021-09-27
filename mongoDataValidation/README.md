## Validation

#### for mandatory properties use required : true. We can also set this required property to any function which returns boolean. Example : price is only required when course is published.

##### price : {type : Number, required : function() {return this.isPublished}}

#### In the above example we cannot use arrow function because arrow function don't have their own this. They use the this value of their enclosing context.

#### to perform some logic on validatior error we can use course.validate(err=>{}) code snippet.

## Built In Validator

### Depending upon the type of properties we have some built in validators available.

### For example properties of type String we have validators like minlength,maxlength, match (where we can pass regex), enum

### For Number we have valdiators min and max. These two validators also available for Date

## Custom Validators

### Every course should have atlease one tag

## Async Validator

### Some times validation logic may include reading something from the database or some service. In this case we need async validator

#### First we need to set isAsync property is true and use the callback to return the result.

##### tags: {

##### type: Array,

##### validate: {

##### isAsync: true,

##### validator: function (v,callback) {

##### setTimeout(()=>{

##### // Do some async work

##### const result = v && v.length > 0;

##### callback(result)

##### },4000)

##### }

##### },

##### message: 'A course should have at least one tag'

##### }

## Validation Errors

### catch (err) {

### for (field in err.errors) {

### console.log(err.errors[field].message)

### }

### }

## SchemaType Options

### For String type properties there are few additonal options we can use like lowercase : true,uppercase:true, trim : true

### getter and setter we can define for any type . Getter is defined using get

#### get : v => Math.round(v)

#### set : v => Math.round(v)
