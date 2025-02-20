import salesService from '../service/sales.services.js';

async function createSalesController(req,res) {
    const newSales = req.body;

    try{
        const createdSales = await salesService.createSalesService(newSales);
        res.status(201).send({createdSales});
    } catch (err){
        return res.status(400).send(err.message);
    }
};

async function findAllSalesController(req, res) {
    try{
        const sales = await salesService.findAllSalesService();
        res.send({sales});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function findSalesByIdController(req, res) {
    const salesId = req.params.id;

    try{
        const sales = await salesService.findSalesByIdService(salesId);
        res.send({sales});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function updateSalesController(req, res) {
    const salesId = req.params.id;
    const updatedSales = req.body;
    
    try{
        const sales = await salesService.updateSalesService(updatedSales, salesId);
        res.send({sales});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function deleteSalesController(req, res) {
    const salesId = req.params.id;
    
    try{
        const message = await salesService.deleteSalesService(salesId);
        res.send({message});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

export default {
    createSalesController,
    findAllSalesController,
    findSalesByIdController,
    updateSalesController,
    deleteSalesController
}