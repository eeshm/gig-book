"use client";

import { BookingStatus } from "@/types";

interface StatusBadgeProps {
  status: BookingStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    ACCEPTED: "bg-green-500/10 text-green-500 border-green-500/20",
    REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
