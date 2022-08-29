require('dotenv').config()
const express = require('express')
const Book = require("./models/book")
const app = express()
const mongoose = require("mongoose")
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI


//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

const ENV = process.env

console.log(ENV.MONGODB_URI)







// Connect to Mongo
// mongoose.connect(MONGODB_URI, () => {
//     console.log('whatever')
// })
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));


app.use(express.static('public'));


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// ======ROUTES======
app.delete("/books/:id", (request, response)=> {
    Book.findByIdAndRemove(request.params.id, (error, deletedBook)=> {
        response.json(deletedBook)
    })
})
app.post("/books", (request,response)=> {
    Book.create(request.body, (error, createdBook)=> {
        response.json(createdBook)
    })
})
app.get("/books", (request, response)=> {
    Book.find({}, (error, foundBook)=> {
        response.json(foundBook)
    })
})
app.put("/books/:id", (request, response)=> {
    Book.findByIdAndUpdate(request.params.id, request.body, {new:true}, (error, updateBook)=> {
        response.json(updateBook)
    })
})



app.listen(PORT, () => console.log('Listening on port:', PORT));
