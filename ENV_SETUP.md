# Environment Configuration Guide

## Local Development Setup

### Frontend (Client) - Port 3000
The `.env.local` file in `apps/client/` is already configured for localhost:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**No action needed** - this is ready for local development.

### Backend (Server) - Port 5000
The backend runs on **port 5000** by default.

1. Update `apps/server/.env.local` with your database URL:
```
PORT=5000
DATABASE_URL=your_local_database_connection_string
```

2. To run the backend locally:
```bash
cd apps/server
npm run dev
```

## Production Setup (Render Deployment)

### Frontend
The `.env.production` file is configured for production:
```
NEXT_PUBLIC_API_URL=https://gig-book.onrender.com/api
```

### Backend
The `.env.production` file needs:
```
PORT=5000
DATABASE_URL=your_render_postgres_database_url
```

## Running Locally

### Terminal 1 - Start Backend Server
```bash
cd apps/server
npm run dev
# Backend will start on http://localhost:5000
```

### Terminal 2 - Start Frontend Development Server
```bash
cd apps/client
npm run dev
# Frontend will start on http://localhost:3000
# Automatically connects to http://localhost:5000/api
```

## Testing the Connection

1. Open http://localhost:3000 in your browser
2. Check the browser console (F12) for any CORS or network errors
3. Your API calls should now work correctly

## Common Issues

### Still getting "Backend not running" error
- Make sure backend server is running on port 5000
- Check that `.env.local` in client has `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
- Clear browser cache and restart both servers

### Database connection errors
- Verify `DATABASE_URL` in `apps/server/.env.local` is correct
- Run `npm run prisma:migrate` in the server directory if needed

### CORS errors
- Backend CORS is set to accept all origins (`*`) in development
- This is already configured in `src/server.ts`
