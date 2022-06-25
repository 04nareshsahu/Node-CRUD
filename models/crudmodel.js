var mongoose = require('mongoose');
var Schema = mongoose.Schema;

crudSchema = new Schema( {
	
	unique_id: Number,
	fname: String,
	lname: String,
	email: String,
	contact: Number,
    job: String,
	salary: Number,
	company: String,
	add: String
}),
Crud = mongoose.model('Crud', crudSchema);

module.exports = Crud;