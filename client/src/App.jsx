import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import ModelsPage from "@/pages/models-page";
import ConverterPage from "@/pages/converter-page";
import AssistantPage from "@/pages/assistant-page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";

// Simplified authentication context
import { createContext } from "react";

// Create a simple authentication context for now
export const AuthContext = createContext(null);

// Simple protected route component without Clerk
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // For now, we'll simulate authentication checking
  // In a real app, this would check an authentication token
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/sign-in" />;
  }

  return <Component {...rest} />;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage}/>
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/models">
        <ProtectedRoute component={ModelsPage} />
      </Route>
      <Route path="/converter">
        <ProtectedRoute component={ConverterPage} />
      </Route>
      <Route path="/assistant">
        <ProtectedRoute component={AssistantPage} />
      </Route>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Simple auth state for our context
  const [user, setUser] = useState(null);
  const authValue = {
    user,
    setUser,
    signIn: (userData) => setUser(userData),
    signOut: () => setUser(null)
  };

  return (
    <AuthContext.Provider value={authValue}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </TooltipProvider>
    </AuthContext.Provider>
  );
}

export default App;