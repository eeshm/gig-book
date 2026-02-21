import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Loading() {
  return (
    <div className="bg-background min-h-screen">
      <LoadingSpinner size="lg" text="Loading venues..." />
    </div>
  );
}
