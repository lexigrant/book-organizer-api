const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title: String,
    image: String, 
    synopsis: String,
    genre: String,
    audio: Boolean,
    link: String,
    price: Number
})
const Book = mongoose.model("book", bookSchema)

module.exports = Book