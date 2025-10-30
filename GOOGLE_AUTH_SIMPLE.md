# 🔐 Google Auth - Simple Summary (ELI5 Edition)

## 🎯 What Problem Did We Solve?

**Before:** 
- User: "I want to sign up as VENUE"
- Clicks Google button
- Backend doesn't know they wanted VENUE
- System: "Okay, I'll make you ARTIST" ❌

**After:**
- User: "I want to sign up as VENUE"
- Frontend: "Got it! VENUE!" (saves to browser memory)
- Clicks Google button
- Frontend: "Hey backend, this person is VENUE"
- Backend: "Perfect! Creating VENUE account" ✅

---

## 🚀 Simple Explanation

### **The Role Storage Trick**
```javascript
// Step 1: User chooses VENUE on registration page
// Step 2: When they click Google button, we save it
sessionStorage.setItem("googleSignupRole", "VENUE");

// Step 3: After Google OAuth succeeds, we retrieve it
const savedRole = sessionStorage.getItem("googleSignupRole");

// Step 4: We send it to backend
api.post("/auth/google", {
  email: "user@gmail.com",
  role: savedRole // ← "VENUE" gets sent here!
});

// Step 5: Backend creates user with VENUE role ✅
```

---

## 📍 The Journey (Step by Step)

### **Registration Page**
```
User sees two buttons:
[I'm an Artist] [I'm a Venue]
```

**If clicks "I'm a Venue":**
```
✅ Browser goes to /register?role=venue
✅ Form shows "Venue Account" badge
```

### **Google Sign-up Button**
```typescript
const handleGoogleSignUp = () => {
  // BEFORE opening Google popup
  sessionStorage.setItem("googleSignupRole", "VENUE");
  
  // THEN open Google
  signIn("google", {
    callbackUrl: "/dashboard/venue"
  });
}
```

### **Google Popup**
```
1. User sees Google login screen
2. User enters Google password
3. User grants permission ("Sign in with Google")
4. Google redirects back with credential
```

### **Behind the Scenes (Next.js)**
```typescript
// auth.ts - signIn callback
async signIn({ user, account, profile }) {
  // We just got Google credential
  // Now retrieve the role we saved earlier
  const role = sessionStorage.getItem("googleSignupRole");
  
  // Call our backend with role included
  const response = await api.post("/auth/google", {
    email: user.email,
    name: user.name,
    googleId: account.providerAccountId,
    role: role // ← Sending role to backend!
  });
  
  // Backend returns token + user data
  return true; // Auth successful
}
```

### **Backend Decision**
```typescript
// authController.ts - googleAuth endpoint
export const googleAuth = async (req, res) => {
  const { email, role } = req.body; // ← Got role from frontend
  
  // Check if user exists
  let user = await db.user.findUnique({ where: { email } });
  
  if (!user) {
    // New user: CREATE with role
    user = await db.user.create({
      data: {
        email,
        role: role // ← Use the role we received!
      }
    });
  }
  
  // Generate token and return
  return { token, user };
}
```

### **Frontend Receives Everything**
```typescript
// providers.tsx - AuthSyncHandler
const { data: session } = useSession();

if (session?.user) {
  // Extract backend token from session
  const backendToken = session.accessToken;
  
  // Store token in cookies (for API calls)
  Cookies.set("token", backendToken);
  
  // Store user in Redux
  dispatch(setUser({
    id: session.user.id,
    role: session.user.role // ← VENUE!
  }));
}
```

### **Redirect to Correct Dashboard**
```typescript
// AuthForm.tsx
if (isAuthenticated && user) {
  const dashboard = user.role === "ARTIST" 
    ? "/dashboard/artist"
    : "/dashboard/venue"; // ← User is VENUE, so go here
  
  router.push(dashboard);
}
```

### **Dashboard Loads Profile**
```typescript
// dashboard/venue/page.tsx
const authUser = useAppSelector(state => state.auth.user);

useEffect(() => {
  if (authUser?.role === "VENUE") {
    // Fetch venue profile
    // Token is in cookies, so API call succeeds
    dispatch(fetchMyVenueProfile());
  }
}, [authUser]);
```

---

## 📊 Data Flow Simplified

```
┌──────────────────────┐
│ Register Page        │
│ "I'm a Venue"        │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│ Save: VENUE          │
│ In: sessionStorage   │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│ Click Google Button  │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────┐
│ Google OAuth Popup   │
│ User logs in         │
└──────────┬───────────┘
           │
           ↓
┌──────────────────────────┐
│ Get saved role: VENUE    │
│ Send to backend API      │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│ Backend: Check email     │
│ New user? YES            │
│ Create with VENUE role   │
│ Generate token           │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│ Frontend receives:       │
│ - Token                  │
│ - User { role: VENUE }   │
│ Store in cookies & Redux │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│ Redirect:                │
│ /dashboard/venue         │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│ Dashboard loads profile  │
│ With token from cookies  │
│ Success! ✅              │
└──────────────────────────┘
```

---

## 🔑 Key Differences: Signup vs Signin

### **SIGNUP (New User)**
```
User: "I'm a VENUE"
│
├─ sessionStorage.setItem("googleSignupRole", "VENUE")
├─ Google OAuth
├─ Backend: User NOT found → CREATE new user
├─ Set role: VENUE ✅
├─ Generate token
└─ Done!
```

### **SIGNIN (Existing User)**
```
User: "Sign me in with Google"
│
├─ NO sessionStorage (not signup)
├─ Google OAuth
├─ Backend: User FOUND → GET existing user
├─ Use their EXISTING role ✅
├─ Generate token
└─ Done!
```

**Key difference:** Storage saves role only during SIGNUP!

---

## 🎁 What Each Tool Does

| Tool | Purpose |
|------|---------|
| **sessionStorage** | Temporary storage (this browser tab only) |
| **NextAuth** | Manages OAuth & sessions |
| **Backend API** | Creates/finds users & generates tokens |
| **Cookies** | Persistent storage (sent with every API call) |
| **Redux** | App state (user data, token, etc.) |

---

## ❓ Common Questions

### **Q: Why use sessionStorage?**
A: Because it's:
- Available in browser only (secure)
- Cleared when tab closes (automatic cleanup)
- Perfect for temporary data (like role during signup)

### **Q: What if user closes browser?**
A: Role is stored during signup, then in database. If they sign in again, backend has their role.

### **Q: How does backend know it's a new user?**
A: It checks if email exists in database.
- Email not found → New user, create with role
- Email found → Existing user, use existing role

### **Q: Why store token in cookies?**
A: So axios interceptor can attach it to every API request automatically.

### **Q: What if someone signs up as VENUE then wants to be ARTIST?**
A: Currently, their role is locked. They'd need admin to change it. (You could add UI for this later)

---

## ✅ What Gets Done Now

### **OLD WAY (Broken)** ❌
```
Google signup → User created as ARTIST (always)
                 → Wrong role! → Wrong dashboard!
```

### **NEW WAY (Fixed)** ✅
```
Google signup → Role saved in browser
             → Sent to backend
             → User created with CORRECT role
             → Correct dashboard! ✅
```

---

## 🧪 Quick Test

1. Go to `/register?role=venue`
2. Click "Sign up with Google"
3. Complete Google auth
4. Check: Did you get redirected to `/dashboard/venue`? ✅
5. Check: Does the page load without 401 error? ✅
6. Check: Is your profile page for venues? ✅

If all three: **It's working perfectly!**

---

## 📱 What Happens on Each Page

### **During Registration**
```
- User sees role badge: "Venue Account"
- User clicks Google button
- Browser remembers: "This is VENUE"
```

### **During Google OAuth**
```
- Google popup opens
- User logs in with Google
- Google returns credential
- Frontend intercepts it
```

### **NextAuth Processing**
```
- Gets Google credential
- Remembers role from browser
- Calls backend with role
- Backend creates user with role
```

### **Backend**
```
- Receives: email, googleId, role
- Checks: Does this email exist?
  - NO: Create new user with role
  - YES: Use existing user
- Generates: JWT token
- Returns: Token + user data
```

### **Frontend Again**
```
- Receives: Token + user data with role
- Stores: Token in cookies, user in Redux
- Redirects: To correct dashboard (/dashboard/venue or /dashboard/artist)
```

### **Dashboard**
```
- Waits for auth ready
- Fetches profile data (now with token!)
- Shows profile ✅
```

---

## 🎯 The Main Innovation

**The secret ingredient:** `sessionStorage.setItem("googleSignupRole", role)`

This simple line bridges the gap between:
- **Frontend** (knows user wants VENUE)
- **Google OAuth** (doesn't know user role)
- **Backend** (needs to know role)

**Result:** Users keep their selected role when signing up with Google! 🎉

