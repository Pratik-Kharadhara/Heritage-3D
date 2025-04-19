import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Axis3d, Wand2 } from 'lucide-react';
import ThreeJSCanvas from '@/components/ThreeJSCanvas';
import ModelCard from '@/components/ModelCard';
import TourCard from '@/components/TourCard';

// Featured models data
const featuredModels = [
  {
    id: 1,
    name: "Taj Mahal",
    description: "Built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal, this ivory-white marble mausoleum is one of the world's most iconic monuments.",
    location: "Agra, Uttar Pradesh",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
  {
    id: 2,
    name: "Qutub Minar",
    description: "A soaring 73-meter minaret built in the early 13th century, featuring intricate carvings and inscriptions from the Delhi Sultanate period.",
    location: "Delhi, India",
    imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
  },
  {
    id: 3,
    name: "Hawa Mahal",
    description: "Known as the \"Palace of Winds,\" this five-story palace features 953 small windows decorated with intricate latticework.",
    location: "Jaipur, Rajasthan",
    imageUrl: "https://images.unsplash.com/photo-1590733840202-2419ecf9b2e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

// Featured tour
const featuredTour = {
  id: 1,
  name: "Taj Mahal: Moonlight Tour",
  description: "Experience the breathtaking beauty of the Taj Mahal under moonlight. This virtual tour takes you through the marble mausoleum and its gardens when they're bathed in the ethereal glow of the moon.",
  location: "Agra, Uttar Pradesh",
  imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
  rating: "4.8",
  reviewCount: 240,
  featured: true
};

// Additional tours
const additionalTours = [
  {
    id: 2,
    name: "Ellora Caves",
    location: "Aurangabad, Maharashtra",
    imageUrl: "https://images.unsplash.com/photo-1602313306079-c96725738c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  },
  {
    id: 3,
    name: "Mysore Palace",
    location: "Mysore, Karnataka",
    imageUrl: "https://images.unsplash.com/photo-1592635196078-9fbb53ab45e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

export default function HomePage() {
  const [activeModelId, setActiveModelId] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="relative py-20 min-h-screen flex items-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <motion.div 
                className="max-w-xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
                  Explore India's Heritage in <span className="text-primary">3D</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Transform text descriptions into detailed 3D models of India's cultural landmarks and monuments. Experience the rich heritage through our interactive virtual tours.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    size="lg" 
                    className="group"
                    asChild
                  >
                    <Link href="/converter">
                      <Wand2 className="mr-2 h-5 w-5 group-hover:animate-bounce" /> 
                      Create 3D Model
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    asChild
                  >
                    <Link href="/models">
                      <Axis3d className="mr-2 h-5 w-5" /> 
                      Explore Models
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <motion.div 
                className="relative w-full max-w-lg h-80 md:h-[450px]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 backdrop-blur-sm shadow-xl overflow-hidden flex items-center justify-center animate-float">
                  <ThreeJSCanvas placeholder={true} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-background/80 flex items-center justify-center shadow-lg">
                      <Axis3d className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
              </motion.div>
            </div>
          </div>
          
          {/* Stats */}
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: "20+", label: "Historical Sites", color: "text-primary" },
              { value: "5K+", label: "3D Models Created", color: "text-secondary" },
              { value: "800+", label: "Virtual Tours", color: "text-yellow-600" },
              { value: "24/7", label: "Knowledge Access", color: "text-primary" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className={`font-bold text-3xl md:text-4xl ${stat.color}`}>{stat.value}</p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Featured Models Section */}
      <section id="models" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-4">
              Explore India's Landmarks in 3D
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Immerse yourself in the intricate architecture and historical beauty of India's most iconic monuments.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ModelCard 
                  model={model} 
                  onClick={() => setActiveModelId(model.id)} 
                />
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button variant="outline" size="lg" asChild>
              <Link href="/models">
                View All 3D Models
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Text to 3D Converter Section Preview */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-4">
              Transform Text to 3D Models
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enter detailed descriptions of Indian heritage monuments and watch as our AI generates interactive 3D models.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="flex justify-center">
              <Button size="lg" className="group" asChild>
                <Link href="/converter">
                  <Wand2 className="mr-2 h-5 w-5 group-hover:animate-bounce" /> 
                  Try Text to 3D Converter
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Virtual Tour Section */}
      <section className="py-20 relative overflow-hidden bg-muted/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-4">
              Virtual Heritage Tours
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Immerse yourself in 360° virtual tours of India's most fascinating historical sites and monuments.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Featured Tour */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="row-span-2"
            >
              <TourCard tour={featuredTour} featured={true} />
            </motion.div>
            
            {/* Additional Tours */}
            <div className="grid grid-cols-1 gap-8">
              {additionalTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <TourCard tour={tour} />
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button variant="outline" size="lg">
              Explore All Virtual Tours
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Knowledge Hub Preview */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-4">
              Heritage Knowledge Hub
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ask questions about Indian monuments, cultural traditions, historical events, and architectural styles.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center"
          >
            <Button asChild>
              <Link href="/assistant">
                Explore Knowledge Hub
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
