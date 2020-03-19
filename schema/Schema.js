const graphql = require('graphql');   // imp to propety types 
const Employee = require('../models/employeeModel'); // model to perform the db operations

const Timesheet = require('../models/timesheetModel');
const EmployeePersonalDetails = require('../models/employeePersonalDetailsModel');

// schema property
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} = graphql;


// Employee type is the GraphQLObjectType  i.e. how graphyql resp object will look and what are the 
// dependencies are mentioned in the GraphQLObject Type

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({

        // These fields are return by the emp query 
        id: { type: GraphQLID },
        employeeCode: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        preferredFullName: { type: GraphQLString },
        jobTitleName: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        emailAddress: { type: GraphQLString },
        // every employee has its timesheets so there is dependencies 
        timesheets: {
            type: new GraphQLList(TimesheetType),  // GraphqlList is used to return array if its normal object then use only type:TimesheetType
            resolve(parent, args) {
                return Timesheet.find({ employeeId: parent.id });
            }
        },
    })
});


// TimesheetType


const TimesheetType = new GraphQLObjectType({
    name: 'Timesheet',
    fields: () => ({
        id: { type: GraphQLID },
        employeeId: { type: GraphQLID },
        timesheetYear: { type: GraphQLString },
        timesheetMonth: { type: GraphQLString },
        timesheetDate: { type: GraphQLString },
        timesheetFullDate: { type: GraphQLString },
        timesheetStatus: { type: GraphQLString },
        timesheetHours: { type: GraphQLString },
        timesheetDescription: { type: GraphQLString },
        timesheetIsBillable: { type: GraphQLBoolean }

        // every employee has its timesheets so there is dependencies 

        // author: {
        //     type: AuthorType,
        //     resolve(parent, args ){
        //         return Author.findById(parent.authorId);
        //         //
        //     }
        // }
    })
});




// for get - query 
// for post/delete/update - mutation 


// root query is used for fetch/get the data 
const RootQuery = new GraphQLObjectType({
    name: 'EmployeeQuery',
    fields: {
        // to fetch the single(employee) record 
        employee: {
            type: EmployeeType,
            args: { id: { type: GraphQLID } },
    
            // resolve is the function which provide the parent data are the arguments pass while query req
            resolve(parent, args , context) {
                console.log("context -data", context.headers);
                // code to get data from db
                // Employee is the mongo model which helpful to use the mongooes methods save(). find() etc...
                // as we already connected to db and the connection is open it will directly look into the collection 
                //
                return Employee.findById(args.id);
                // return statement will return the data as the response
            }
        },

        // to fetch the all records in employee collection
        employees: {
            type: new GraphQLList(EmployeeType),
            // we are not accepting any args here 
            resolve(parent, args, context) {
                let user = context.headers.user;

                // we can access teh headers / tokens here to resolve the authen / authorization

                if(user == "admin"){
                    return Employee.find();
                }else{
                    throw new Error('You are not authorized!');
                }
              
                // // Make sure that the user is authenticated
                // if (context.headers.user === "admin") {
                //     return Employee.find();
                // }else{
                //     throw new Error('You are not authorized!');
                // }

        }
    },

    // get employeet timesheet
    timesheets: {
        type: new GraphQLList(TimesheetType),
        args: { id: { type: GraphQLID }, skip: { type: GraphQLInt }, limit: { type: GraphQLInt } },
        resolve(parent, args , context) {
            console.log("context -data", context);
            return Timesheet.find().skip(args.skip).limit(args.limit);
        }
    },

    empTimesheets: {
        type: new GraphQLList(TimesheetType),
        args: { employeeId: { type: GraphQLID }, timesheetStatus: { type: GraphQLString } },
        resolve(parent, args) {

            if (args.timesheetStatus) {
                return Timesheet.find(
                    {
                        employeeId: args.employeeId,
                        timesheetStatus: args.timesheetStatus
                    });
            }

            return Timesheet.find({ employeeId: args.employeeId });
        }
    }
}
});


// update delete add employe to db 
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) }, // not null validation 
                lastName: { type: GraphQLString },
                preferredFullName: { type: GraphQLString },
                employeeCode: { type: GraphQLString },
                phoneNumber: { type: GraphQLString },
                emailAddress: { type: GraphQLString },
            },
            resolve(parent, args) {
                let emp = new Employee({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    preferredFullName: args.preferredFullName,
                    employeeCode: args.employeeCode,
                    phoneNumber: args.phoneNumber,
                    emailAddress: args.emailAddress
                })
                return emp.save();
            }
        },
        removeEmployee: {
            type: EmployeeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }, // to remove employee id must be there
            },
            resolve: (post, args) => {
                return Employee.findByIdAndDelete(args.id).exec(); // we return the same emp which record is deleted
            }
        },
        updateEmployee: {
            type: EmployeeType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                firstName: { type: GraphQLString }, // not null validation 
                lastName: { type: GraphQLString },
                preferredFullName: { type: GraphQLString },
                employeeCode: { type: GraphQLString },
                phoneNumber: { type: GraphQLString },
                emailAddress: { type: GraphQLString },
            },
            resolve(parent, args) {
                let updateObj = {
                    firstName: args.firstName, // not null validation 
                    lastName: args.lastName,
                    preferredFullName: args.preferredFullName,
                    employeeCode: args.employeeCode,
                    phoneNumber: args.phoneNumber,
                    emailAddress: args.emailAddress
                }
                return Employee.findByIdAndUpdate(args.id, updateObj).exec(); //
            }
        },

        addTimesheet: {
            type: TimesheetType,
            args: {
                employeeId: { type: new GraphQLNonNull(GraphQLString) },
                timesheetYear: { type: GraphQLString },
                timesheetMonth: { type: GraphQLString },
                timesheetDate: { type: GraphQLString },
                timesheetFullDate: { type: GraphQLString },
                timesheetDescription: { type: GraphQLString },
                timesheetStatus: { type: GraphQLString },
                timesheetHours: { type: GraphQLString },
                timesheetIsBillable: { type: GraphQLBoolean }
            },
            resolve(parent, args) {
                let timeSheet = new Timesheet({
                    employeeId: args.employeeId,
                    timesheetYear: args.timesheetYear,
                    timesheetDate: args.timesheetDate,
                    timesheetFullDate: args.timesheetFullDate,
                    timesheetDescription: args.timesheetDescription,
                    timesheetStatus: args.timesheetStatus,
                    timesheetHours: args.timesheetHours,
                    timesheetIsBillable: args.timesheetIsBillable
                })
                return timeSheet.save();
            }
        },

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});





// performance code 
// https://jsbin.com/nejonudinu/1/edit?js,console,output
