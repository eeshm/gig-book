import { ArtistType, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { argon2Sync } from 'crypto';
import { parse } from 'path';
import {includes, z} from 'zod';
import prisma from '../prisma.js';

export const artistCreateSchema = z.object({
    artistType: z.enum(['DJ','LIVE_PERFORMER','SINGER','INSTRUMENTALIST','BAND','OTHER']),
    location:z.string().min(2).max(50),
    bio:z.string().min(10).max(300),
    pricePerGig:z.number().optional(),
    mediaUrls:z.array(z.string().url()).optional(),
    availability:z.json().optional(), // Expecting a JSON object for availability
})