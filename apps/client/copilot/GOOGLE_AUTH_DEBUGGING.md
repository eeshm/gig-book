# Google Auth Error Debugging Guide

## Error: Redirected to `/api/auth/error`

This means the `signIn` callback in `lib/auth.ts` is returning `false`.

---

## Debugging Steps:

### Step 1: Check Browser Console
Open DevTools (F12) and go to **Console** tab to see the new debug logs:

```
🔐 Google Auth - signIn callback triggered
📧 Email: user@gmail.com
👤 Name: User Name
🆔 Google ID: 123456789...
🎭 Role from sessionStorage: ARTIST
✅ Backend response: {...}
```

or

```
❌ Google sign-in error:  Error: Request failed with status code 500
❌ Error response: {error: "Authentication failed"}
❌ Error status: 500
❌ Error message: ...
```

---

### Step 2: Check Backend Logs

The backend `/auth/google` endpoint might be failing. Check:

```bash
# Start server with logs visible
cd apps/server
npm run dev
# Watch for console errors when you try to sign in
```

Look for errors like:
- Database connection issue
- Prisma model errors
- Missing fields

---

### Step 3: Verify Backend Endpoint Exists

Check if route is registered:

```bash
# In apps/server/src/routes/auth.ts, verify this line exists:
authRoutes.post("/google", googleAuth);
```

---

### Step 4: Test Endpoint Directly

Use curl or Postman to test:

```bash
curl -X POST http://localhost:5000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@gmail.com",
    "name": "Test User",
    "googleId": "123456789",
    "image": "https://...",
    "role": "ARTIST"
  }'
```

**Expected response:**
```json
{
  "token": "eyJh...",
  "user": {
    "id": "...",
    "email": "test@gmail.com",
    "name": "Test User",
    "role": "ARTIST",
    "image": "https://..."
  }
}
```

---

### Step 5: Check API URL

In `lib/axios.ts`:
```typescript
baseURL: process.env.NEXT_PUBLIC_API_URL || "https://gig-book.onrender.com/api",
```

For **local development**, the backend should be running on `http://localhost:5000/api`

Create `.env.local.development`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Or update `.env.local`:
```env
# For local dev:
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# For production:
NEXT_PUBLIC_API_URL=https://gig-book.onrender.com/api
```

---

## Common Issues & Solutions:

| Issue | Solution |
|-------|----------|
| 404 - endpoint not found | Verify `/google` route added to `auth.ts` and exported |
| 500 - Internal error | Check server logs for database/Prisma errors |
| CORS error | Add CORS headers in backend server config |
| "googleId does not exist" | Prisma schema not migrated - run `prisma migrate dev` |
| Empty response | Backend returning `null` or incomplete data |

---

## Quick Checklist:

- [ ] Verify `NEXTAUTH_SECRET` is set in `.env.local`
- [ ] Verify `NEXTAUTH_URL=http://localhost:3000`
- [ ] Verify Google credentials are correct
- [ ] Backend server is running (`npm run dev` in apps/server)
- [ ] Backend has `/auth/google` route
- [ ] Prisma migration ran (`npx prisma migrate dev`)
- [ ] Check browser console for detailed error logs
- [ ] Test backend endpoint with curl/Postman

---

## Next Steps:

1. **Run dev server:**
   ```bash
   cd apps/server
   npm run dev
   ```

2. **Try signing up/in and check console logs**

3. **Share the error messages from console** and I'll help fix it!
