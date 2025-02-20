import { z } from 'zod';

const orderSchema = z.object({
    orderDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Invalid format. Use DD-MM-YYYY").optional(),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    status: z.enum(["pending", "delivered", "cancelled"], "Invalid status"),
    clientId: z.number().int().positive('Client ID must be a positive integer'), // FK
    productId: z.number().int().positive('Product ID must be a positive integer'),   // FK
});

const orderIdSchema = z.object({
    orderId: z.number().int().positive('Order ID must be a positive integer'),
});

export { orderSchema, orderIdSchema };