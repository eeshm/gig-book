import { register } from 'module';
import {z} from 'zod';

export const registerSchema = z.object({
    name:z.string().min(3).max(20),
    email:z.string().email(),
    password:z.string().min(8).max(20),
    role:z.enum(['ARTIST','VENUE'])
})

export const loginSchema =z.object({
    email:z.string().email(),
    password:z.string().min(8).max(20),
    
})