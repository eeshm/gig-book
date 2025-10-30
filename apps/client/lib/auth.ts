import NextAuth, { type NextAuthOptions, type Session } from "next-auth";
import Google from "next-auth/providers/google";
import api from "./axios";
import Cookies from "js-cookie";
import { UserRole } from "@/types";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    id: string;
    role?: UserRole;
  }

  interface Session {
    user: User & {
      role?: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    userId?: string;
  }
}

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  providers: [
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log("🔐 Google Auth - signIn callback triggered");
        console.log("📧 Email:", user.email);
        console.log("👤 Name:", user.name);
        console.log("🆔 Google ID:", account?.providerAccountId);

        // Check if we have a signup role stored in sessionStorage
        const signupRole = typeof window !== "undefined" 
          ? sessionStorage.getItem("googleSignupRole") 
          : null;

        // Call backend to handle Google OAuth
        // Backend will either:
        // 1. Return existing user with their role
        // 2. Create new user with the selected role (or default to ARTIST)
        const response = await api.post("/auth/google", {
          email: user.email,
          name: user.name,
          googleId: account?.providerAccountId,
          image: user.image,
          role: signupRole || "ARTIST", // Send the role from signup flow
        });

        console.log("✅ Backend response:", response.data);

        const { token, user: userData } = response.data;

        if (!token) {
          console.error("❌ No token in response");
          return false;
        }

        // Extend user object with role and id from backend
        user.id = userData.id;
        user.role = userData.role as UserRole;

        // Store token in user object to pass to jwt callback
        (user as any).accessToken = token;

        console.log("✅ User authenticated successfully");
        console.log("👤 User ID:", user.id);
        console.log("🎭 User Role:", user.role);
        
        return true;
      } catch (error: any) {
        console.error("❌ Google sign-in error: ", error);
        console.error("❌ Error response:", error.response?.data);
        console.error("❌ Error status:", error.response?.status);
        console.error("❌ Error message:", error.message);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id;
        token.role = user.role;
        // Store the access token from backend in JWT
        if ((user as any).accessToken) {
          token.accessToken = (user as any).accessToken;
          console.log("🔐 JWT callback - accessToken stored in JWT token");
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.role = token.role as UserRole;
      }
      // Store access token in session so we can access it client-side
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
        console.log("🔐 Session callback - accessToken added to session");
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
export const { signIn, signOut, auth } = NextAuth(authOptions);