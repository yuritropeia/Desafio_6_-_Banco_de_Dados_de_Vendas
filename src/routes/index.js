import { Router } from 'express';
import clientRouters from './client.routes.js';
import productRouters from './product.routes.js';
import loanRouters from './loan.routes.js';

const routers = Router();

routers.use("/clients", clientRouters);
routers.use("/products",productRouters);
routers.use("/loans",loanRouters);

export {routers}