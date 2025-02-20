import {z} from 'zod';

const salesSchema = z.object({
    order_id: z.number().int().positive(),
    total: z
    .number()
    .positive("Total must be a positive number")
    .refine(value => Number.isFinite(value), {
      message: "Total must be a float (e.g., 99.99)",
    }),
    sale_date: z.string().regex(/^\d{2}[/]\d{2}[/]\d{4}$/, "Invalid format. Use DD-MM-YYYY").optional(),
});

const salesIdSchema = z.object({
    salesId: z.number().int().positive("Sales ID must be a positive integer"),
});

export {salesSchema, salesIdSchema}