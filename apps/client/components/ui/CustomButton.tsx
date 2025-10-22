import { cn } from "@/lib/utils";

export function Button2({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn("py-4 hover:bg-primary transition-color duration-200", className)}
      {...props}
    >
      {children}
    </button>
  );
}