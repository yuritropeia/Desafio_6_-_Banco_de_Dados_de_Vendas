import salesRepository from '../repositories/sales.repositories.js'

async function  createSalesService(newSales){   
    const createdSales = await salesRepository.createSalesRepository(
        newSales
    );
    if(!createdSales) throw new Error("Error creating sales");
       
    return createdSales;    
};

async function findAllSalesService() {
    const sales = await salesRepository.findAllSalesRepository();
    return sales;
};


async function findSalesByIdService(salesId){
    const sales = await salesRepository.findSalesByIdRepository(salesId);
    if (!sales) throw new Error('Sales not found');
    return sales;
};

async function updateSalesService(updatedSales, salesId) {
    const sales = await salesRepository.findSalesByIdRepository(salesId);
    if (!sales) throw new Error('Sales not found');
    const response = await salesRepository.updateSalesRepository(updatedSales, salesId);
    return response;
};

async function deleteSalesService(salesId) {
    const sales = await salesRepository.findSalesByIdRepository(salesId);
    if (!sales) throw new Error('Sales not found');
    const {message} = await salesRepository.deleteSalesRepository(salesId);
    return message;
}

export default {
    createSalesService,
    findAllSalesService,
    findSalesByIdService,
    updateSalesService,
    deleteSalesService
}