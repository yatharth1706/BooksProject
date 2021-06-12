const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique: true
    },
    bookAuthor: {
        type: String,
        required: true,
        default: ""
    },
    bookPublication: {
        type: String,
        default: ""
    },
    bookTags: [String],
    bookStoreList:[{
        storeName: {type: String, default: ""},
        storeMapLat: {type: Number, default: 0},
        storeMapLong: {type: Number, default: 0},
        storeOwnerContactDetails: {type: String, default: ""}
    }]    
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book