import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@/components/ui/theme-provider.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.js";
import { ClerkProvider } from "@clerk/clerk-react";

// Get your Clerk publishable key - already added to environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.error("Missing Clerk Publishable Key");
}

// We use ClerkProvider for authentication instead of custom AuthProvider
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider defaultTheme="system" storageKey="heritage-theme">
        <App />
      </ThemeProvider>
    </ClerkProvider>
  </QueryClientProvider>
);