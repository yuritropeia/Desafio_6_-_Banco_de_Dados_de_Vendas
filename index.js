import express from 'express';
import { routers } from './src/routes/index.js';
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routers);
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});