import { motion } from 'framer-motion';
import { Axis3d, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Model } from '@shared/schema';

interface ModelCardProps {
  model: Partial<Model>;
  onClick?: () => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onClick }) => {
  return (
    <motion.div 
      className="card-3d rounded-xl overflow-hidden bg-card border shadow-lg"
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-56">
        <img 
          src={model.imageUrl || "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"} 
          alt={model.name || "3D Model"} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-4 right-4 bg-background/80 dark:bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
          <Axis3d className="text-secondary h-5 w-5" />
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-xl text-card-foreground mb-2">{model.name || "Unnamed Model"}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          {model.description || "No description available for this 3D model."}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {model.location || "Unknown Location"}
          </span>
          
          <Button 
            variant="default" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={onClick}
          >
            <Eye className="h-4 w-4" /> View in 3D
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ModelCard;
