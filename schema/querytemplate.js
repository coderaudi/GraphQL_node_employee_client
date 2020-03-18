// mutation{
//     addTimesheet (
//     employeeId: "5e7208a5cd4ec91f70140762",
//     timesheetYear: "2020",
//     timesheetMonth: "DEC",
//     timesheetDate: "1",
//     timesheetFullDate: "1 DEC 2020",
//     timesheetStatus: "SUBMIT",
//     timesheetHours: "08:00",
//     timesheetDescription :"GraphyQl is working fine ",
//     timesheetIsBillable: false
//     ){
//         id,
//         timesheetFullDate,
//         employeeId,
//         timesheetDescription
//     }}


//     // add emp

//     mutation{
//         addEmployee(firstName: "JONN", lastName:"TIM",preferredFullName:"JONN TIM",
//        employeeCode:"EMP001", phoneNumber:"1122334455", emailAddress : "EMP@ORG.COM"){
//         id,
//         preferredFullName,
//         employeeCode,
//         emailAddress
//       }
//       }


//       // get emp with timesheet 

//       {
//         employee(id:"5e70994be1ec6927f884ff12"){
//           id,
//           firstName,
//           empTimesheets{
//             id,
//             employeeId,
//             timesheetYear
//           }
//         }
//       }