import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import ModelViewerTest from "./pages/ModelViewerTest"; // Import our test page
import ConverterPage from "@/pages/converter-page";
import AssistantPage from "@/pages/assistant-page";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useContext } from "react";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";

// Import AuthContext and AuthProvider
import { AuthContext, AuthProvider } from "./context/auth-context";

// Simple protected route component without Clerk
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // Use our auth context to check if user is authenticated
  const auth = useContext(AuthContext);
  const [isLoading] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  if (!auth || !auth.user) {
    return <Redirect to="/sign-in" />;
  }

  return <Component {...rest} />;
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={ModelViewerTest}/>
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
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
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;