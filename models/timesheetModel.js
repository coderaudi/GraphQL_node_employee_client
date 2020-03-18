  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;  // mongoose schema is the actual structure in database
 
const timesheetsSchema = new Schema({
  //  id: String, no need to define the id property as mongo provide it by default when you create a record !
    employeeId: String,
    timesheetYear: String,
    timesheetMonth : String,
    timesheetDate: String,
    timesheetFullDate :String,
    timesheetDescription: String,
    timesheetStatus : String,
    timesheetIsBillable: Boolean,
    timesheetHours : String
});

module.exports = mongoose.model('Timesheets', timesheetsSchema);  // Employee is the collection name in db 
