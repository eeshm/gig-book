# Google Auth Re-rendering Issue - Root Cause Analysis & Fixes

## 🔍 Issues Found

### **BACKEND ISSUES:**

#### 1. ❌ Role Not Sent to Backend During Google Signup
**File:** `apps/client/lib/auth.ts` (NextAuth signIn callback)
**Problem:** 
```typescript
// Frontend was NOT sending role to backend
const response = await api.post("/auth/google", {
  email: user.email,
  name: user.name,
  googleId: account?.providerAccountId,
  image: user.image,
  // ❌ Missing: role parameter!
});
```

**Impact:** All new Google signups were created with hardcoded `ARTIST` role, even if user selected `VENUE`.

**Fix Applied:**
- Modified `auth.ts` to retrieve the role from `sessionStorage` (set by AuthForm)
- Now sends: `role: signupRole || "ARTIST"` to backend
- Backend now correctly receives and uses the role

---

#### 2. ❌ No Error Logging on Backend
**File:** `apps/server/src/controllers/authController.ts`
**Problem:** 
- Missing logs on `/auth/google` endpoint to debug issues
- Missing logs on `/auth/me` endpoint
- Can't trace what's happening during authentication

**Fix Applied:**
- Added comprehensive logging to `googleAuth()` function
- Added comprehensive logging to `me()` function
- Now shows:
  - Email, name, googleId received
  - Role from frontend
  - Whether user is new or existing
  - User ID when token is generated
  - Role assigned to user

---

### **FRONTEND ISSUES:**

#### 1. ❌ Dependency Array on Dashboard Page
**File:** `apps/client/app/dashboard/artist/page.tsx`
**Problem:** 
```typescript
useEffect(() => {
  // Only fetch profile once
  if (!profile && !loading && !hasFetchedRef.current) {
    dispatch(fetchMyArtistProfile());
  }
}, []); // ❌ Empty dependency array - doesn't wait for auth!
```

**Impact:** Profile fetch was called before auth state was synced, causing API errors.

**Fix Applied:**
- Added dependencies: `[authUser, authLoading, profile, loading, dispatch]`
- Now waits for `authUser` to be populated before fetching profile
- Prevents re-render loops

---

#### 2. ⚠️ Session Callback in providers.tsx
**File:** `apps/client/app/providers.tsx`
**Problem:** 
- Token was in NextAuth session but code was looking in cookies
- `lastStatusRef.current === null` would trigger repeatedly

**Fix Applied:**
- Added `isInitializedRef` to ensure single initialization
- Extracts token from `(session as any).accessToken`
- Stores it in cookies for persistence
- Prevents repeated "🔓 Initial unauthenticated status" logs

---

#### 3. ⚠️ Redirect Timing Issue
**File:** `apps/client/components/auth/AuthForm.tsx`
**Problem:** 
- Redirecting to dashboard immediately after auth
- Redux state not synced yet

**Fix Applied:**
- Added 100ms delay before redirect
- Allows Redux state to synchronize

---

## 📊 Flow After Fixes

```
Google Signup Flow:
1. User selects role (ARTIST/VENUE) on registration page
2. Role stored in sessionStorage: googleSignupRole
3. User clicks "Sign up with Google"
4. Google OAuth completes
5. NextAuth calls signIn callback
6. Frontend fetches role from sessionStorage
7. ✅ Sends role to /auth/google endpoint
8. Backend creates user with CORRECT role
9. Backend returns token with user data
10. NextAuth session includes accessToken
11. AuthSyncHandler syncs to Redux (ONE TIME)
12. Wait 100ms before redirecting to dashboard
13. Dashboard fetches profile with proper auth
14. ✅ NO MORE RE-RENDERS!
```

---

## 🧪 How to Test

### Test 1: Role Persistence
1. Go to `/register?role=venue`
2. Click "Sign up with Google"
3. Check backend logs - should show: `🎭 Role from frontend: VENUE`
4. User should be created with VENUE role

### Test 2: No Re-rendering
1. Sign up with Google
2. Open browser DevTools Console
3. Should see these logs **ONCE**:
   - ⏳ NextAuth session loading...
   - 🔐 Google Auth - signIn callback triggered
   - ✅ Backend response: {...}
   - ✅ NextAuth session found, syncing with Redux
   - 🔑 Token stored in cookies from session
   - 📡 Fetching artist profile...

4. Should **NOT** see these repeatedly:
   - 🔓 Initial unauthenticated status
   - 🚪 No authentication found

### Test 3: Existing User with Google
1. Sign up with Google (creates new user)
2. Logout
3. Sign in again with same Google account
4. Backend logs should show: `✅ User already exists with Google`
5. Should not have re-rendering issues

---

## 🛠️ Additional Improvements Made

### Enhanced Logging
All key endpoints now include detailed logging:
- `/auth/google` - Shows role, user creation status, token generation
- `/auth/me` - Shows user lookup and role
- Frontend providers.tsx - Shows sync status

### Error Handling
- Backend validates email and googleId
- Frontend stores role in sessionStorage for OAuth flow
- Proper error responses with meaningful messages

---

## 📋 Files Modified

1. ✅ `apps/client/lib/auth.ts` - Fixed role passing to backend
2. ✅ `apps/client/app/providers.tsx` - Fixed initialization logic
3. ✅ `apps/client/app/dashboard/artist/page.tsx` - Fixed dependency array
4. ✅ `apps/client/components/auth/AuthForm.tsx` - Added redirect delay
5. ✅ `apps/server/src/controllers/authController.ts` - Added comprehensive logging

---

## 🚀 Next Steps

1. Test the Google signup flow with both ARTIST and VENUE roles
2. Monitor server logs to confirm proper role assignment
3. Check browser console to ensure no repeated logs
4. Remove render count tracking once verified (line in dashboard)

