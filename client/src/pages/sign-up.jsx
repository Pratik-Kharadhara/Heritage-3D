import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "wouter";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission would be handled here in a real implementation
    console.log("Sign up with:", { name, email, password, acceptTerms });
  };
  
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
          
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Enter your details to create an account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="example@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                    required
                  />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    I accept the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full">Create Account</Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account? <Link href="/sign-in" className="text-primary hover:underline">Sign in</Link>
              </p>
            </CardFooter>
          </Card>
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