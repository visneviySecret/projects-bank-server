const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
// allow cross-origin requests
app.use(cors())
// connect to mongo database
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DB = process.env.MONGO_DB


const DB_URL = 'mongodb+srv://Belodin:belodin@projectsbank.kpryt.mongodb.net/?retryWrites=true&w=majority'

if (process.env.NODE_ENV === 'production') {
    db.connect(process.env.MONGODN_URI)
    console.log('connected to database')
} else {
    db.connect(DB_URL)
}

mongoose.connect()
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('now listening for requests on port 4000');
});

