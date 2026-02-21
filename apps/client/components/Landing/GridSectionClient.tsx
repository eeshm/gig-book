"use client";

import dynamic from "next/dynamic";

// ImageGrid uses scroll-transform hooks (useScroll/useTransform) — must be
// client-only. ssr:false is only valid inside a Client Component.
const ImageGrid = dynamic(() => import("./ImageGrid"), {
  loading: () => <div className="h-96 w-full" />,
  ssr: false,
});

export default function GridSectionClient() {
  return <ImageGrid />;
}
