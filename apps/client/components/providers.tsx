'use client';
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      {children}
      <Toaster />
    </ReduxProvider>
  );
}
