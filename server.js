require('dotenv').config()
const mongoose = require("mongoose")
const db = mongoose.connection
const MONGODB_URI  = process.env.MONGODB_URI 

const ENV = process.env
<p>Hello World</p>
console.log(ENV.MONGODB_URI)

// Connect to Mongo
mongoose.connect(MONGODB_URI, () => {
    console.log('whatever')
})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
