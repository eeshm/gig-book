import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Get Started</h1>
          <p className="text-muted-foreground">Create your account to start booking gigs</p>
        </div>

        <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
          <AuthForm mode="register" />

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}