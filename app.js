const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')

const app = express();

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

app.use(express.static('public'))

app.get('*l', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'public', 'index.html'))
})

PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('now listening for requests on port: ', PORT);
});

