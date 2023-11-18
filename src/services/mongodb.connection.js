const mongoose = require('mongoose');
const config = require('../config')

const MONGO_HOST = config.connect_db.mongo_host;
const MONGO_PORT = config.connect_db.mongo_port;
const MONGO_DB = config.connect_db.mongo_db;

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`).then(() => console.log('Databse Connected Successfully...'));