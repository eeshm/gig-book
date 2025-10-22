import {z} from "zod";

export  const venueCreateSchema = z.object({
    venueName: z.string().min(2, "Venue name must be at least 2 characters").max(100),
    location: z.string().min(2, "Location must be at least 2 characters").max(100),
    description: z.string().min(10, "Description must be at least 10 characters").max(300),
    capacity: z.preprocess(
        (val) => {
            // Convert empty string or null to undefined
            if (val === "" || val === null || val === undefined) return undefined;
            const num = Number(val);
            return isNaN(num) ? undefined : num;
        },
        z.number().int().min(0).optional()
    ),
    venueType: z.preprocess(
        (val) => {
            // Convert empty string to undefined
            if (val === "" || val === null) return undefined;
            return val;
        },
        z.string().min(2).max(50).optional()
    ),
    mediaUrls: z.array(z.string().url()).max(5).optional()
});  

export default venueCreateSchema;