import {z} from 'zod';

const clientSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid Email"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"), // Validação padrão E.164
    address: z.string().min(5,"Address is required")
});

const clientIdSchema = z.object({
    clientId: z.number().int().positive("Client ID must be a positive integer"),
});

export {clientSchema, clientIdSchema}