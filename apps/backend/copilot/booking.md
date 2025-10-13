We are creating a booking controller and routes, which are the main logic of this project. 
These are routes :
1.POST /api/bookings → Venue creates a booking request

2.GET /api/bookings → List bookings relevant to user (artist gets bookings for their artistProfile; venue gets bookings they requested)

3.PUT /api/bookings/:id/status → Artist accepts/rejects (only artist role)

4.GET /api/bookings/:id → fetch single booking

Take input and zod validation from schemas/booking.ts

Ensure req.user.role === 'VENUE' ( We only let Venue to make bookigns from their side)

Ensure artistId exists


Accept/reject flow:

Artist calls PUT /api/bookings/:id/status with { status: 'ACCEPTED' }

Verify booking belongs to artist

Update status.

ALways use proper formatting and type checking for typescript and write clean code.
