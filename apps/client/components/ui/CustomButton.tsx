import { cn } from "@/lib/utils";

export function Button2({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "font-family-oswald hover:bg-primary transition-color py-4 duration-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
