import bookService from '../service/book.services.js';

async function  createBookController(req,res) {
    const newBook = req.body;
    const userId = req.userId;

    try{
        const createdBook = await bookService.createBookService(newBook, userId);
        res.status(201).send({createdBook});
    } catch (err){
        return res.status(400).send(err.message);
    }
};

async function findAllBooksController(req, res) {
    try{
        const books = await bookService.findAllBooksService();
        res.send({books});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function findBookByIdController(req, res) {
    const bookId = req.params.id;

    try{
        const book = await bookService.findBookByIdService(bookId);
        res.send({book});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function updateBookController(req, res) {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const userId = req.params.userId;
    
    try{
        const book = await bookService.updateBookService(updatedBook, bookId, userId);
        res.send({book});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function deleteBookController(req, res) {
    const bookId = req.params.id;
    const userId = req.params.userId;
    
    try{
        const message = await bookService.deleteBookService(bookId, userId);
        res.send({message});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function searchBooksController(req, res) {
    try {
      const { search } = req.query;
      const books = await bookService.searchBooksService(search);
      return res.send(books);
    } catch (error) {
      res.status(400).send(error.message);
    }
};
  

export default {
    createBookController,
    findAllBooksController,
    findBookByIdController,
    updateBookController,
    deleteBookController,
    searchBooksController
}