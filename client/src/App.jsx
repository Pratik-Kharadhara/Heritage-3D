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
import { 
  ClerkLoaded, 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn
} from "@clerk/clerk-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Protected route component using Clerk
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <ClerkLoaded>
      <SignedIn>
        <Component {...rest} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkLoaded>
  );
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
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;