import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Info, ZoomIn, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface ModelViewerProps {
  modelUrl?: string;
  isPreview?: boolean;
  name?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, isPreview = false, name }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Get monument image based on name or URL
  const getMonumentImage = () => {
    if (name?.toLowerCase().includes('taj mahal') || modelUrl?.toLowerCase().includes('taj')) {
      return "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80";
    } else if (name?.toLowerCase().includes('qutub minar') || modelUrl?.toLowerCase().includes('qutub')) {
      return "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80";
    } else {
      return "https://images.unsplash.com/photo-1515091943-9d5c0ad475af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
    }
  };

  // Get monument name
  const getMonumentName = () => {
    if (name) return name;
    if (modelUrl?.toLowerCase().includes('taj')) return 'Taj Mahal';
    if (modelUrl?.toLowerCase().includes('qutub')) return 'Qutub Minar';
    return 'Heritage Monument';
  };

  return (
    <div className={`w-full h-full flex flex-col ${isPreview ? 'bg-slate-100 dark:bg-slate-800 rounded-lg p-4' : ''}`}>
      {isPreview && (
        <h3 className="font-poppins font-semibold text-xl text-foreground mb-4">Preview</h3>
      )}
      
      <div className="flex-grow model-viewer-container relative rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <motion.div
            className="h-full flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isPreview ? (
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-muted flex items-center justify-center">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">3D Preview</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative group">
                  <img
                    src={getMonumentImage()}
                    alt={getMonumentName()}
                    className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button variant="secondary" size="sm" className="shadow-lg">
                      <ZoomIn className="h-4 w-4 mr-2" />
                      View Full Size
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold tracking-tight mb-2">{getMonumentName()}</h2>
                  <p className="text-muted-foreground max-w-md">
                    {name?.toLowerCase().includes('taj') || modelUrl?.toLowerCase().includes('taj') ? 
                      'One of the seven wonders of the world, built by Emperor Shah Jahan in memory of his beloved wife.' :
                      'The tallest brick minaret in the world, built in the early 13th century.'}
                  </p>
                  
                  <div className="mt-4 flex gap-2 justify-center">
                    <Button variant="outline" size="sm">
                      <Info className="h-4 w-4 mr-2" />
                      More Info
                    </Button>
                    <Button className="gradient-button" size="sm">
                      <Image className="h-4 w-4 mr-2" />
                      View Gallery
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
      
      {isPreview && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-muted/50 flex items-center justify-center">
            <Info className="h-4 w-4 text-muted-foreground mr-2" />
            <span className="text-xs text-muted-foreground">3D Model Coming Soon</span>
          </div>
          <button 
            className="p-2 rounded bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
            title="Reset View"
          >
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;
