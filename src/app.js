const express = require('express');
const bodyParser = require('body-parser');
const mainController = require('./controllers')
require('./services/mongodb.connection')

const app = express();

const PORT = process.env.PORT || 8081

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', mainController);

app.listen(PORT, () => {
    console.log(`Server is running on port no. ${PORT}`)
});