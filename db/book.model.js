const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    bookPublication: {
        type: String,
        required: true
    },
    bookTags: [String],
    bookStoreList:[{
        storeName: String,
        storeMapLat: Number,
        storeMapLong: Number,
        storeOwnerContactDetails: String
    }]    
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book