import stockService from '../service/stock.services.js';

async function createStockController(req,res) {
    const newStock = req.body;

    try{
        const createdStock = await stockService.createStockService(newStock);
        res.status(201).send({createdStock});
    } catch (err){
        return res.status(400).send(err.message);
    }
};

async function findAllStockController(req, res) {
    try{
        const stocks = await stockService.findAllStockService();
        res.send({stocks});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function findStockByIdController(req, res) {
    const stockId = req.params.id;

    try{
        const stock = await stockService.findStockByIdService(stockId);
        res.send({stock});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function updateStockController(req, res) {
    const stockId = req.params.id;
    const updatedStock = req.body;
    
    try{
        const stock = await stockService.updateStockService(updatedStock, stockId);
        res.send({stock});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function deleteStockController(req, res) {
    const stockId = req.params.id;
    
    try{
        const message = await stockService.deleteStockService(stockId);
        res.send({message});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

export default {
    createStockController,
    findAllStockController,
    findStockByIdController,
    updateStockController,
    deleteStockController
}