import bookRepository from '../repositories/book.repositories.js'

async function  createBookService(newBook, userId){   
    const createdBook = await bookRepository.createBookRepository(
        newBook, 
        userId
    );
    if(!createdBook) throw new Error("Error creating Book");
       
    return createdBook;    
};

async function findAllBooksService() {
    const books = await bookRepository.findAllBooksRepository();
    return books;
};


async function findBookByIdService(bookId){
    const book = await bookRepository.findBookByIdRepository(bookId);
    if (!book) throw new Error('Book not found');
    return book;
};

async function updateBookService(updatedBook, bookId, userId) {
    const book = await bookRepository.findBookByIdRepository(bookId);
    if (!book) throw new Error('Book not found');
    if (book.userId !== userId) throw new Error('Unauthorized');
    const response = await bookRepository.updateBookRepository(updatedBook, bookId);
    return response;
};

async function deleteBookService(bookId, userId) {
    const book = await bookRepository.findBookByIdRepository(bookId);
    if (!book) throw new Error('Book not found');
    if (book.userId !== userId) throw new Error('Unauthorized');
    const {message} = await bookRepository.deleteBookRepository(bookId);
    return message;
}

async function searchBooksService(text) {
    if (!text) return await bookRepository.findAllBooksRepository();
    const books = await bookRepository.searchBooksRepository(text);
    return books;
  }

export default {
    createBookService,
    findAllBooksService,
    findBookByIdService,
    updateBookService,
    deleteBookService,
    searchBooksService
}