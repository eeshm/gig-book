import { BookingStatus } from '@prisma/client';
import { z } from 'zod';

// Base schema mirrors the Booking model fields; useful for consistent response shaping.
export const bookingBaseSchema = z.object({
       id: z.string().uuid(),
       artistId: z.string().uuid(),
       venueId: z.string().uuid(),
       date: z.date(),
       status: z.nativeEnum(BookingStatus),
       message: z.string().trim().min(1).max(500).nullable().optional(),
       createdAt: z.date(),
       updatedAt: z.date(),
});

export const bookingCreateSchema = z.object({
       artistId: z.string().uuid(),
       date: z.coerce.date(),
       message: z.string().trim().max(500).optional().or(z.literal('')),
});

export const bookingIdParamSchema = z.object({
       id: z.string().uuid(),
});

const decisionalStatuses = ['ACCEPTED', 'REJECTED'] as const;

export const bookingStatusUpdateSchema = z.object({
       status: z.enum(decisionalStatuses, { message: 'Status must be ACCEPTED or REJECTED' }),
});