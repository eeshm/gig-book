# 🔐 Google Signup/Signin Flow - Complete Explanation

## 📚 Overview

Your app now has a complete Google OAuth 2.0 integration that handles both **signup** (new users) and **signin** (existing users) with role preservation.

---

## 🎯 The Big Picture

```
User clicks "Sign in/up with Google"
         ↓
Google OAuth popup opens
         ↓
User grants permissions
         ↓
NextAuth receives Google credential
         ↓
Backend validates/creates user
         ↓
Token generated and stored
         ↓
Redirected to appropriate dashboard
```

---

## 📍 Step-by-Step Flow Explained

### **STEP 1: User Chooses Registration Mode & Role**

**File:** `RegisterContent.tsx`

```typescript
// URL: /register?role=venue OR /register?role=artist
const role = searchParams.get("role") || "ARTIST";
```

When user goes to:
- `/register?role=artist` → Shows ARTIST signup form
- `/register?role=venue` → Shows VENUE signup form

---

### **STEP 2: User Clicks "Sign up with Google"**

**File:** `AuthForm.tsx` - `handleGoogleSignIn()` function

```typescript
const handleGoogleSignIn = async () => {
  setGoogleLoading(true);
  
  if (mode === "register") {
    // 🔑 KEY: Store the role BEFORE Google OAuth
    sessionStorage.setItem("googleSignupRole", initialRole);
    
    // Initiate Google OAuth with callback to dashboard
    await signIn("google", {
      callbackUrl: `/dashboard/${initialRole === "ARTIST" ? "artist" : "venue"}`,
      redirect: true, // Auto-redirect after success
    });
  } else {
    // For login: Just redirect to dashboard (system will figure out their role)
    await signIn("google", {
      callbackUrl: "/dashboard",
      redirect: true,
    });
  }
};
```

**What happens:**
1. Stores role in `sessionStorage` (temporary browser storage for this tab)
2. Opens Google OAuth popup
3. User logs in with Google
4. Google redirects back with credential

---

### **STEP 3: NextAuth Receives Google Credential**

**File:** `auth.ts` - `signIn callback`

```typescript
callbacks: {
  async signIn({ user, account, profile }) {
    // This runs AFTER Google authenticates successfully
    console.log("🔐 Google Auth - signIn callback triggered");
    
    // Retrieve the role we stored earlier
    const signupRole = sessionStorage.getItem("googleSignupRole");
    
    // ... continue to backend
  }
}
```

**What's in the parameters:**
- `user.email` - From Google account
- `user.name` - From Google account
- `user.image` - Profile picture from Google
- `account.providerAccountId` - Google's unique ID for this user

---

### **STEP 4: Talk to Your Backend**

**File:** `auth.ts` - Still in `signIn callback`

```typescript
const response = await api.post("/auth/google", {
  email: user.email,
  name: user.name,
  googleId: account.providerAccountId,
  image: user.image,
  role: signupRole || "ARTIST", // 🔑 Send the role
});

const { token, user: userData } = response.data;
```

**API Call:** `POST /api/auth/google`

**Request Body:**
```json
{
  "email": "user@gmail.com",
  "name": "John Doe",
  "googleId": "1234567890",
  "image": "https://...",
  "role": "VENUE"  // From sessionStorage!
}
```

---

### **STEP 5: Backend Processing**

**File:** `authController.ts` - `googleAuth()` function

```typescript
export const googleAuth = async (req: Request, res: Response) => {
  const { email, name, googleId, image, role } = req.body;

  // Check if user already exists
  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // NEW USER: Create with role from frontend
    user = await prisma.user.create({
      data: {
        email,
        name,
        googleId,
        image,
        role: role || "ARTIST", // Use role we received!
        emailVerified: new Date(),
      },
    });
    console.log("✅ New user created:", user.id, "Role:", user.role);
  } else if (!user.googleId) {
    // EXISTING USER WITH EMAIL: Link their Google
    user = await prisma.user.update({
      where: { email },
      data: { googleId },
    });
  } else {
    // EXISTING USER: Already has Google linked
    console.log("✅ User already exists with Google:", user.id);
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // Return token + user data
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    },
  });
};
```

**Database Operations:**
- **New User:** Creates user record with:
  - Email
  - Name
  - Google ID
  - Profile image
  - **Role (ARTIST or VENUE)**
  - Marks email as verified

- **Existing User:** Links Google ID if not already linked

**Response:**
```json
{
  "token": "eyJhbGc...", // JWT token
  "user": {
    "id": "user123",
    "email": "user@gmail.com",
    "name": "John Doe",
    "role": "VENUE",
    "image": "https://..."
  }
}
```

---

### **STEP 6: NextAuth Processes Response**

**File:** `auth.ts` - Still in `signIn callback`

```typescript
// Store token on user object
user.id = userData.id;
user.role = userData.role;
(user as any).accessToken = token; // Pass to JWT callback

return true; // Continue to next callback
```

**Flow:**
1. ✅ `signIn` returns `true` → Success
2. ✅ Calls `jwt` callback next
3. ✅ Then calls `session` callback

---

### **STEP 7: JWT Callback - Store in Token**

**File:** `auth.ts` - `jwt callback`

```typescript
async jwt({ token, user, account }) {
  if (user) {
    // Only runs on first auth
    token.userId = user.id;
    token.role = user.role;
    
    // Store backend token in JWT
    if ((user as any).accessToken) {
      token.accessToken = (user as any).accessToken;
    }
  }
  return token; // This token is now signed and secure
}
```

**JWT Token now contains:**
```json
{
  "userId": "user123",
  "role": "VENUE",
  "accessToken": "eyJhbGc...",
  "iat": 1234567890,
  "exp": 1234654290
}
```

---

### **STEP 8: Session Callback - Expose to Frontend**

**File:** `auth.ts` - `session callback`

```typescript
async session({ session, token }) {
  // Make token data available to frontend
  if (session.user) {
    session.user.id = token.userId;
    session.user.role = token.role;
  }
  
  // Make backend token accessible
  if (token.accessToken) {
    (session as any).accessToken = token.accessToken;
  }
  
  return session;
}
```

**Session now looks like:**
```typescript
{
  user: {
    id: "user123",
    email: "user@gmail.com",
    name: "John Doe",
    role: "VENUE",
    image: "https://..."
  },
  accessToken: "eyJhbGc...", // Backend token for API calls
  expires: "2025-10-31"
}
```

---

### **STEP 9: Frontend Receives Session**

**File:** `providers.tsx` - `AuthSyncHandler` component

```typescript
const { data: session, status } = useSession();

if (status === "authenticated" && session?.user) {
  // 🔑 Extract backend token from NextAuth session
  const accessToken = (session as any).accessToken;
  
  if (accessToken) {
    // 💾 Store in cookies for axios to use
    Cookies.set("token", accessToken, { expires: 7 });
  }
  
  // 🔄 Sync to Redux (our app state)
  store.dispatch(setUser({
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  }));
}
```

---

### **STEP 10: Redirect to Dashboard**

**File:** `AuthForm.tsx` - `useEffect` for redirect

```typescript
useEffect(() => {
  if (isAuthenticated && user && !hasRedirectedRef.current) {
    hasRedirectedRef.current = true;
    
    // Redirect to correct dashboard based on role
    const redirectPath = user.role === "ARTIST" 
      ? "/dashboard/artist" 
      : "/dashboard/venue";
    
    setTimeout(() => {
      router.push(redirectPath); // Wait 100ms for state sync
    }, 100);
  }
}, [isAuthenticated, user, router]);
```

---

### **STEP 11: Dashboard Loads & Fetches Profile**

**File:** `dashboard/venue/page.tsx` (or artist)

```typescript
const authUser = useAppSelector((state) => state.auth.user);
const authLoading = useAppSelector((state) => state.auth.loading);

useEffect(() => {
  // Wait for auth to be ready
  if (authUser && !authLoading && authUser.role === "VENUE") {
    // ✅ Token is now in cookies!
    dispatch(fetchMyVenueProfile());
  }
}, [authUser, authLoading, ...]);
```

**API Call:**
```
GET /api/venues/me
Headers:
  Authorization: "Bearer eyJhbGc..."  ← Token from axios interceptor
```

---

### **STEP 12: Axios Interceptor Adds Token**

**File:** `lib/axios.ts` - Request interceptor

```typescript
api.interceptors.request.use((config) => {
  // ✅ Get token from cookies (we stored it earlier)
  const token = Cookies.get("token");
  
  if (token) {
    // ✅ Add to every API request
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});
```

---

## 🔄 Comparison: Signup vs Signin

### **NEW USER - SIGNUP Flow**

```
1. User at /register?role=venue
2. Clicks "Sign up with Google"
3. sessionStorage: googleSignupRole = "VENUE"
4. Google OAuth → User grants permission
5. Backend: User doesn't exist → CREATE new user with role VENUE
6. Return token + user data
7. NextAuth stores in JWT + session
8. Frontend syncs to Redux
9. Redirect to /dashboard/venue
10. Fetch venue profile
11. Profile created → User can complete setup
```

### **EXISTING USER - SIGNIN Flow**

```
1. User at /login
2. Clicks "Sign in with Google"
3. NO sessionStorage (login mode)
4. Google OAuth → User grants permission
5. Backend: User EXISTS → GET user (use existing role)
6. Return token + user data (with STORED role)
7. NextAuth stores in JWT + session
8. Frontend syncs to Redux
9. Redirect to /dashboard
10. Dashboard figures out role from Redux
11. Fetch appropriate profile
12. Show existing data
```

---

## 📊 Data Flow Diagram

```
┌─────────────────┐
│  Registration   │
│   /register     │
└────────┬────────┘
         │
         ├─ Choose Role: ARTIST/VENUE
         │
         └─ Click "Sign up with Google"
            └─ Store role in sessionStorage
               │
               ↓
┌─────────────────────────┐
│   Google OAuth Flow     │
│  (Google Popup)         │
│  User grants permission │
└────────┬────────────────┘
         │
         ↓
┌──────────────────────────┐
│ NextAuth signIn Callback │
├──────────────────────────┤
│ 1. Get role from storage │
│ 2. Call /auth/google     │
│ 3. Backend processes     │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│    Backend: /auth/google │
├──────────────────────────┤
│ Check if user exists     │
│ YES: Get existing user   │
│ NO: Create new user      │
│      with role           │
│                          │
│ Generate JWT token       │
│ Return token + user      │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│   NextAuth Callbacks     │
├──────────────────────────┤
│ 1. signIn → return true  │
│ 2. jwt → store in token  │
│ 3. session → expose data │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│  Frontend: providers.tsx │
├──────────────────────────┤
│ 1. Get session from Auth │
│ 2. Extract token         │
│ 3. Store in cookies      │
│ 4. Sync to Redux         │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│   Redirect to Dashboard  │
├──────────────────────────┤
│ Check role → go to:      │
│ ARTIST → /dashboard/...  │
│ VENUE → /dashboard/venue │
└────────┬─────────────────┘
         │
         ↓
┌──────────────────────────┐
│  Dashboard Page Loads    │
├──────────────────────────┤
│ Wait for authUser ready  │
│ Verify role matches      │
│ Fetch profile with token │
└──────────────────────────┘
```

---

## 🔑 Key Concepts

### **1. Role Preservation (The Main Fix)**
- **Problem:** Google didn't know if user was signing up as ARTIST or VENUE
- **Solution:** Store role in `sessionStorage` before OAuth, send to backend
- **Result:** New users created with correct role

### **2. Token Management**
- **Backend token:** JWT returned by your backend (`/auth/google`)
- **NextAuth token:** Secure JWT managed by NextAuth
- **Cookies:** Backend token stored here for axios to use
- **Redux:** User data stored here for app state

### **3. Session Strategy**
- Using JWT strategy (not database sessions)
- 7-day expiration
- Secure secret stored in env

### **4. Callbacks Order**
```
signIn() → jwt() → session() → frontend
```

Each callback transforms the data for next step.

---

## 🛠️ Configuration Files

### **Environment Variables Needed:**
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxx.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### **Session Storage:**
```typescript
// Temporary (cleared when tab closes)
sessionStorage.setItem("googleSignupRole", "VENUE");

// Permanent (until manually cleared)
localStorage.setItem("key", "value");

// Cookies (sent with every request)
Cookies.set("token", accessToken, { expires: 7 });
```

---

## ✅ Testing Scenarios

### **Test 1: New User - Google Signup as VENUE**
```
1. Go to /register?role=venue
2. Click "Sign up with Google"
3. Select Google account
4. Check database: User created with role VENUE ✅
5. Check browser: Redirected to /dashboard/venue ✅
6. Check profile fetch: Success (no 401) ✅
```

### **Test 2: Existing User - Google Signin**
```
1. Go to /login
2. Click "Sign in with Google" (with same Google account)
3. Check database: No new user created ✅
4. Check browser: Logged in, correct dashboard ✅
5. Check profile: Shows existing data ✅
```

### **Test 3: Role Change (Edge Case)**
```
1. User signs up as ARTIST
2. Later signs in as VENUE role... 
   → System uses existing role (ARTIST)
   → No role override for existing users
   → This is correct behavior
```

---

## 🎓 Summary

**Before:** Google signup didn't preserve role → Everyone got ARTIST

**After:** 
1. Frontend captures role before OAuth
2. Passes it to backend
3. Backend creates user with correct role
4. Everything works smoothly!

**The Magic:** `sessionStorage` + `role` parameter in API call!

