const express = require('express');
const app = express();
const  cors = require('cors') ; // req to handle cross requests

const graphqlHTTP = require('express-graphql'); // to handle the graphql request
app.use(cors()); 


// connect your application to db 
const mongoose = require('mongoose'); // to use the mongodb 

const dbURl = "mongodb+srv://root:root@cluster0-aronb.mongodb.net/bookstore_graphql?retryWrites=true&w=majority";
mongoose.connect(dbURl);
mongoose.connection.once('open',()=>{
    console.log("connected to the db ");
})


// get the schema structure 
const schema = require('./schema/Schema');

// all the request with /graphql end point will be handover to the graphqlHTTP 
// the single end point for all the API calls
app.use('/graphql' , graphqlHTTP({
    schema,  //  the graphql schema 
    //
    graphiql : true // middleware to show the graphical view of query fire
}))



app.listen(4200, ()=>{
    console.log("running 4200 port !")
})