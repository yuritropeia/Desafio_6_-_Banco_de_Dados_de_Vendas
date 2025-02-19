import productService from '../service/product.services.js';

async function createProductController(req,res) {
    const newProduct = req.body;

    try{
        const createdProduct = await productService.createProductService(newProduct);
        res.status(201).send({createdProduct});
    } catch (err){
        return res.status(400).send(err.message);
    }
};

async function findAllProductsController(req, res) {
    try{
        const products = await productService.findAllProductsService();
        res.send({products});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function findProductByIdController(req, res) {
    const productId = req.params.id;

    try{
        const product = await productService.findProductByIdService(productId);
        res.send({product});
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function updateProductController(req, res) {
    const productId = req.params.id;
    const updatedProduct = req.body;
    
    try{
        const product = await productService.updateProductService(updatedProduct, productId);
        res.send({product});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function deleteProductController(req, res) {
    const productId = req.params.id;
    
    try{
        const message = await productService.deleteProductService(productId);
        res.send({message});        
    }catch(e){
        return res.status(404).send(e.message);
    }
};

async function searchProductsController(req, res) {
    try {
      const { search } = req.query;
      const products = await productService.searchProductsService(search);
      return res.send(products);
    } catch (error) {
      res.status(400).send(error.message);
    }
};

export default {
    createProductController,
    findAllProductsController,
    findProductByIdController,
    updateProductController,
    deleteProductController,
    searchProductsController
}