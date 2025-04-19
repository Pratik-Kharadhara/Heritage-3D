import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@/components/ui/theme-provider.jsx";
import { AuthProvider } from "@/hooks/use-auth.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.js";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="heritage-theme">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);