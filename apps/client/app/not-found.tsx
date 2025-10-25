// app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TriangleWarning from "@/public/src/assets/triangle-warning";

export default function NotFound() {
  return (
    <div className="max-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <TriangleWarning className="mx-auto h-16 w-8 mb-2" />
        <h1 className="heading">404</h1>
        <h2 className="subheading mb-4">Page Not Found</h2>
        <p className="subtext mb-8 max-w-md">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <Button className="bg-primary/80">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}