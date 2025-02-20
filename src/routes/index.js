import { Router } from 'express';
import clientRouters from './client.routes.js';
import stockRouters from './stock.routes.js';
import salesRouters from './sales.routes.js';
import productRouters from './product.routes.js';
import loanRouters from './loan.routes.js';

const routers = Router();

routers.use("/clients", clientRouters);
routers.use("/products", productRouters);
routers.use("/stock", stockRouters);
routers.use("/sales",salesRouters);
routers.use("/loans",loanRouters);

export {routers}