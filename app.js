const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

// allow cross-origin requests
app.use(cors())
// connect to mongo database
mongoose.connect('mongodb+srv://Belodin:belodin@projectsbank.kpryt.mongodb.net/?retryWrites=true&w=majority')
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

// app.listen({ }).then(({ url }) => {
// console.log(`🚀 Server ready at ${url}`);
// });