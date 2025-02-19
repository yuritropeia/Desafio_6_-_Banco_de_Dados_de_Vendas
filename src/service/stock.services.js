import stockRepository from '../repositories/stock.repositories.js'

async function  createStockService(newStock){   
    const createdStock = await stockRepository.createStockRepository(
        newStock
    );
    if(!createdStock) throw new Error("Error creating stock");
       
    return createdStock;    
};

async function findAllStockService() {
    const stocks = await stockRepository.findAllStockRepository();
    return stocks;
};


async function findStockByIdService(stockId){
    const stock = await stockRepository.findStockByIdRepository(stockId);
    if (!stock) throw new Error('Stock not found');
    return stock;
};

async function updateStockService(updatedStock, stockId) {
    const stock = await stockRepository.findStockByIdRepository(stockId);
    if (!stock) throw new Error('Stock not found');
    const response = await stockRepository.updateStockRepository(updatedStock, stockId);
    return response;
};

async function deleteStockService(stockId) {
    const stock = await stockRepository.findStockByIdRepository(stockId);
    if (!stock) throw new Error('Stock not found');
    const {message} = await stockRepository.deleteStockRepository(stockId);
    return message;
}

export default {
    createStockService,
    findAllStockService,
    findStockByIdService,
    updateStockService,
    deleteStockService
}