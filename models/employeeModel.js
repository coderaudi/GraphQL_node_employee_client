  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;  // mongoose schema is the actual structure in database

const employeeSchema = new Schema({
  //  id: String, no need to define the id property as mongo provide it by default when you create a record !
    firstName: String,
    lastName: String,
    jobTitleName : String,
    preferredFullName: String,
    employeeCode: String,
    phoneNumber: String,
    emailAddress: String
});

module.exports = mongoose.model('Employee', employeeSchema);  // Employee is the collection name in db 
