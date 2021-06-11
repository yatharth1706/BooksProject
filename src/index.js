const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Book = require('./../db/book.model')

/** For env configurations */
require("dotenv").config()

const app = express()

/** Enable Cors */
app.use(cors())

/** For JSON and urlencoded requests */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Port details */
const port = process.env.PORT || 3000;

/** GET All Books Route */
app.get('/api/books', async (req,res) => {
    const bookList = await Book.find({});
    res.status(200).send(bookList)
})

/** Get Specific Books Routes */
app.get('/api/books/:id', async (req,res) => {
    const bookById = await Book.findOne({_id: req.params.id});
    if(bookById){
        res.status(200).send(bookById)
    }else{
        res.status(400).send({message: "Book record does not exist."})
    }
})

/** Create Book Record */
app.post('/api/books', async (req, res) => {
    const payload = {
        bookName : req.body.bookName,
        bookAuthor : req.body.bookAuthor,
        bookPublication : req.body.bookPublication,
        bookTags : req.body.bookTags,
        bookStoreList: req.body.bookStoreList 
    }
    const newBook = await new Book({...payload});
    newBook.save()
    res.status(201).send({message: "Book record created successfully!"})
})

/** Update Book Record */
app.put('/api/books/:id', async (req, res) => {
    Book.findOne({_id: req.params.id}, (err, book) => {
        if(err){
            res.status(400).send({message: err})
            return;
        }

        book.bookName = req.body.bookName;
        book.bookAuthor = req.body.bookAuthor;
        book.bookPublication = req.body.bookPublication;
        book.bookTags = req.body.bookTags;
        book.bookStoreList = req.body.bookStoreList;

        book.save()
        res.status(200).send({message: "Book record updated successfully!"})
    })
})

/** Delete Book Record */
app.delete('/api/books/:id', async (req, res) => {
    Book.findOne({_id: req.params.id}, function (error, book){
        if(error){
            res.status(400).send({message: error})
            return;
        }
        book.remove();
        res.status(200).send({message: "Book record deleted successfully!"})
    });
})

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})

mongoose.connect(process.env.MONGODBURI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to mongodb successfully!')
}).catch((e) => {
    console.log(e)
})
