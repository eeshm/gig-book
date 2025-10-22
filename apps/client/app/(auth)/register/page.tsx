import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  // Await searchParams before accessing its properties
  const params = await searchParams;
  // Convert URL role to uppercase for the enum, default to ARTIST
  const role = params.role?.toUpperCase() === "VENUE" ? "VENUE" : "ARTIST";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-left px-4 mb-4">
          <h1 className="text-4xl font-bold text-foreground mb-2">Get Started</h1>
          <p className="text-muted-foreground">Create your account to start booking gigs</p>
        </div>

        <div className="bg-card p-4  shadow-lg">
          <AuthForm mode="register" initialRole={role} />

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