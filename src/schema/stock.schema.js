import {z} from 'zod';

const stockSchema = z.object({
    product_id: z.number().int().positive(),
    quantity: z
    .number().int()
    .positive("Quantity must be a positive number"),
    update_date: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Invalid format. Use DD-MM-YYYY").optional()
    ,
});

const stockIdSchema = z.object({
    stockId: z.number().int().positive("Stock ID must be a positive integer"),
});

export {stockSchema, stockIdSchema}