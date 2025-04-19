import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tour } from '@shared/schema';

interface TourCardProps {
  tour: Partial<Tour>;
  featured?: boolean;
  onClick?: () => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, featured = false, onClick }) => {
  if (featured) {
    return (
      <motion.div 
        className="card-3d bg-card rounded-2xl overflow-hidden shadow-xl border row-span-2"
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative h-72">
          <img 
            src={tour.imageUrl || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"} 
            alt={tour.name || "Virtual Tour"} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button 
              className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play className="h-8 w-8 text-white fill-white" />
            </motion.button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
            <h3 className="font-semibold text-xl">{tour.name || "Unnamed Tour"}</h3>
            <p className="text-sm text-white/80">{tour.location || "Unknown Location"}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-yellow-500 fill-none'}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              {tour.rating || "4.8"} ({tour.reviewCount || "240"} reviews)
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm mb-6">
            {tour.description || "No description available for this virtual tour."}
          </p>
          
          <Button onClick={onClick} className="w-full">
            Start Virtual Tour
          </Button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="card-3d bg-card rounded-xl overflow-hidden shadow-lg border"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-48">
        <img 
          src={tour.imageUrl || "https://images.unsplash.com/photo-1602313306079-c96725738c58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"} 
          alt={tour.name || "Virtual Tour"} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button 
            className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="h-6 w-6 text-white fill-white" />
          </motion.button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-card-foreground mb-1">
          {tour.name || "Unnamed Tour"}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">
          {tour.location || "Unknown Location"}
        </p>
        
        <Button 
          variant="link" 
          size="sm" 
          className="p-0 h-auto text-primary flex items-center"
          onClick={onClick}
        >
          Start Tour
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 ml-1"
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
      </div>
    </motion.div>
  );
};

export default TourCard;
