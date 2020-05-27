const config = require('./models/db');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let contactRouter = require('./routes/contact');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// define a simple route
app.use('/contacts', contactRouter);

app.get('/', (req, res) => {
    res.json({"message": "hai"});
});
// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});