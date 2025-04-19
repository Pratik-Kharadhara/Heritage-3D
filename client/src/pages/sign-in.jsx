import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export default function SignInPage() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col md:flex-row">
      {/* Left column - Sign In Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8 md:p-16" 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
          </div>
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            redirectUrl="/"
            appearance={{
              elements: {
                rootBox: "rounded-xl shadow-lg",
                card: "bg-background",
                headerTitle: "text-foreground text-xl font-semibold",
                headerSubtitle: "text-muted-foreground text-sm",
                socialButtonsBlockButton: "border-border hover:bg-muted transition-colors",
                socialButtonsBlockButtonText: "text-foreground",
                dividerText: "text-muted-foreground",
                formFieldLabel: "text-foreground",
                formFieldInput: "bg-background text-foreground border-border",
                formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
                footerActionText: "text-muted-foreground",
                footerActionLink: "text-primary hover:text-primary/90",
              }
            }}
          />
        </div>
      </motion.div>
      
      {/* Right column - Hero Image and Text */}
      <motion.div 
        className="hidden md:flex flex-1 bg-primary/5 dark:bg-primary/10 p-16 items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-md">
          <motion.div 
            className="mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">Explore India's Heritage in 3D</h2>
            <p className="text-muted-foreground">Discover incredible monuments and heritage sites through immersive 3D models and virtual tours.</p>
          </motion.div>
          
          <motion.div
            className="bg-background rounded-xl overflow-hidden shadow-xl" 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da" 
              alt="Taj Mahal"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg text-foreground mb-2">Taj Mahal</h3>
              <p className="text-muted-foreground text-sm">Experience the beauty of this iconic monument in stunning 3D detail.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}