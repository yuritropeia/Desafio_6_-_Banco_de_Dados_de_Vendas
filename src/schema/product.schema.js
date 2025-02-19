import {z} from 'zod';

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    descrition: z.string().min(1, "Descrition is required"),
    price: z
    .number()
    .positive("Price must be a positive number")
    .refine(value => Number.isFinite(value) && !Number.isInteger(value), {
      message: "Price must be a float (e.g., 99.99)",
    }),
});

const productIdSchema = z.object({
    productId: z.number().int().positive("Product ID must be a positive integer"),
});

export {productSchema, productIdSchema}