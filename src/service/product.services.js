import productRepository from '../repositories/product.repositories.js'

async function  createProductService(newProduct){   
    const createdProduct = await productRepository.createProductRepository(
        newProduct
    );
    if(!createdProduct) throw new Error("Error creating product");
       
    return createdProduct;    
};

async function findAllProductsService() {
    const products = await productRepository.findAllProductsRepository();
    return products;
};


async function findProductByIdService(productId){
    const product = await productRepository.findProductByIdRepository(productId);
    if (!product) throw new Error('Product not found');
    return product;
};

async function updateProductService(updatedProduct, productId) {
    const product = await productRepository.findProductByIdRepository(productId);
    if (!product) throw new Error('Product not found');
    const response = await productRepository.updateProductRepository(updatedProduct, productId);
    return response;
};

async function deleteProductService(productId) {
    const product = await productRepository.findProductByIdRepository(productId);
    if (!product) throw new Error('Product not found');
    const {message} = await productRepository.deleteProductRepository(productId);
    return message;
}

async function searchProductsService(text) {
    if (!text) return await productRepository.findAllProductsRepository();
    const products = await productRepository.searchProductsRepository(text);
    return products;
  }

export default {
    createProductService,
    findAllProductsService,
    findProductByIdService,
    updateProductService,
    deleteProductService,
    searchProductsService
}