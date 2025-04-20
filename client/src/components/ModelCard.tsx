import { motion } from 'framer-motion';
import { Axis3d, Eye, Landmark, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Model } from '@shared/schema';
import { Badge } from '@/components/ui/badge';

interface ModelCardProps {
  model: Partial<Model>;
  onClick?: () => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  return (
    <motion.div 
      className="animated-border neon-card card-3d rounded-xl overflow-hidden relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 300,
        damping: 20
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img 
          src={model.imageUrl || "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"} 
          alt={model.name || "3D Model"} 
          className="w-full h-full object-cover transition-transform duration-700" 
          whileHover={{ scale: 1.1 }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* 3D icon badge */}
        <motion.div 
          className="absolute top-4 right-4 bg-background/20 backdrop-blur-lg rounded-full p-2 shadow-lg border border-white/10"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 15px rgba(59, 130, 246, 0.7)"
          }}
        >
          <Axis3d className="text-white h-5 w-5 drop-shadow-glow" />
        </motion.div>
        
        {/* Featured badge (if applicable) */}
        {model.featured && (
          <Badge 
            variant="secondary" 
            className="absolute top-4 left-4 shadow-lg neon-border-accent"
          >
            <Award className="h-3 w-3 mr-1" /> Featured
          </Badge>
        )}
      </div>
      
      <div className="p-6 backdrop-blur-sm relative z-10">
        <h3 className="font-bold text-xl mb-2 group-hover:neon-text transition-all duration-300">
          {model.name || "Unnamed Model"}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {model.description || "No description available for this 3D model."}
        </p>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground flex items-center">
                <Landmark className="h-3 w-3 mr-1 text-primary" />
                {model.location || "Unknown Location"}
              </span>
              
              <span className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1 text-primary" />
                {model.year || "Unknown Age"}
              </span>
            </div>
          </div>
          
          <Button 
            variant="default" 
            size="sm" 
            className="glow-button w-full flex items-center justify-center gap-2 mt-2"
            onClick={onClick}
          >
            <Eye className="h-4 w-4" /> 
            <span className="font-medium">Explore in 3D</span>
          </Button>
        </div>
      </div>
      
      {/* Decorative corner element */}
      <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M64 0v64H0C0 28.7 28.7 0 64 0z" fill="url(#paint0_linear)" fillOpacity="0.2"/>
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="64" x2="64" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6"/>
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
};

export default ModelCard;
