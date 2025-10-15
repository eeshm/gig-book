// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4">
      <div className="text-center">
        <AlertCircle className="mx-auto h-16 w-16 text-yellow-500 mb-6" />
        <h1 className="text-5xl font-bold text-white mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-slate-200 mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}