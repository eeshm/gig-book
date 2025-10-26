"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      {Icon && (
        <div className="mb-4 flex h-10 w-10 items-center justify-center">
          <Icon className="text-muted-foreground h-8 w-8" />
        </div>
      )}
      <h3 className="text-foreground mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md text-xs">{description}</p>
      {actionLabel && onAction && <Button onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
