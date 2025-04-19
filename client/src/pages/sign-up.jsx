import { SignUp } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col md:flex-row">
      {/* Left column - Sign Up Form */}
      <motion.div 
        className="flex-1 flex items-center justify-center p-8 md:p-16" 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Create an account</h1>
            <p className="text-muted-foreground mt-2">Join us to explore India's heritage in 3D</p>
          </div>
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
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
      
      {/* Right column - Hero Content */}
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Unlock Premium Features</h2>
            <p className="text-muted-foreground">Create an account to unlock access to text-to-3D conversion, virtual tours, and our interactive knowledge assistant.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-background rounded-xl p-5 shadow-md">
              <h3 className="font-semibold text-base text-foreground mb-2">3D Models</h3>
              <p className="text-muted-foreground text-sm">Explore detailed 3D models of India's heritage monuments.</p>
            </div>
            <div className="bg-background rounded-xl p-5 shadow-md">
              <h3 className="font-semibold text-base text-foreground mb-2">Virtual Tours</h3>
              <p className="text-muted-foreground text-sm">Take guided virtual tours of historical sites.</p>
            </div>
            <div className="bg-background rounded-xl p-5 shadow-md">
              <h3 className="font-semibold text-base text-foreground mb-2">Text-to-3D</h3>
              <p className="text-muted-foreground text-sm">Convert text descriptions into 3D visualizations.</p>
            </div>
            <div className="bg-background rounded-xl p-5 shadow-md">
              <h3 className="font-semibold text-base text-foreground mb-2">Knowledge Assistant</h3>
              <p className="text-muted-foreground text-sm">Ask questions about monuments and get instant answers.</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}