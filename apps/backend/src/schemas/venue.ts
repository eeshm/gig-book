import {z} from "zod";

export  const venueCreateSchema = z.object({
    venueName: z.string().min(2).max(100),
    location: z.string().min(2).max(100),
    description: z.string().min(10).max(300),
    mediaUrls: z.array(z.string().url()).max(5).optional()
});  

export default venueCreateSchema;