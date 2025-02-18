import { z } from 'zod';

const loanSchema = z.object({
    orderDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).min(10, 'Order date must be in the format YYYY-MM-DD'),
    quantity: z.number().int().positive("Quantity must be a positive integer"),
    status: z.enum(["PENDING", "APPROVED", "SHIPPED", "DELIVERED", "CANCELLED"], "Invalid status"),
    clientId: z.number().int().positive('Client ID must be a positive integer'), // FK
    productId: z.number().int().positive('Product ID must be a positive integer'),   // FK
});

const loanIdSchema = z.object({
    orderId: z.number().int().positive('Loan ID must be a positive integer'),
});

export { loanSchema, loanIdSchema };