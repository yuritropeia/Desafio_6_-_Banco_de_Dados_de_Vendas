import { Router } from 'express';
import clientRouters from './client.routes.js';
import bookRouters from './book.routes.js';
import loanRouters from './loan.routes.js';

const routers = Router();

routers.use("/clients", clientRouters);
routers.use("/books",bookRouters);
routers.use("/loans",loanRouters);

export {routers}