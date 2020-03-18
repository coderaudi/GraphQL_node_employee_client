const mongoose = require('mongoose');
const Schema = mongoose.Schema;  // mongoose schema is the actual structure in database
 
const employeePersonalDetailsSchema = new Schema({
  //  id: String, no need to define the id property as mongo provide it by default when you create a record !
  //  employeedId : ObjectId,
    employeeCode : String,
    fatherName: String,
    dob: String,
    doj : String,
    currentAddress: String,
    permonentAddress: String,
});

module.exports = mongoose.model('EmployeePersonalDetails', employeePersonalDetailsSchema);  // Employee is the collection name in db 
