import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Wand2 } from 'lucide-react';
import BasicModelViewer from '@/components/BasicModelViewer';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function ConverterPage() {
  const [modelName, setModelName] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [modelUrl, setModelUrl] = useState<string | undefined>(undefined);
  const [stylePreferences, setStylePreferences] = useState({
    realistic: false,
    stylized: false,
    detailed: false,
    lowpoly: false
  });
  const { toast } = useToast();

  const handleStyleChange = (style: keyof typeof stylePreferences) => {
    setStylePreferences(prev => ({
      ...prev,
      [style]: !prev[style]
    }));
  };

  const handleGenerate = async () => {
    if (!modelName.trim()) {
      toast({
        title: "Model name required",
        description: "Please enter a name for your 3D model",
        variant: "destructive"
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please provide a detailed description of the monument",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation process - in production this would be a real API call
    toast({
      title: "Starting generation",
      description: "Processing your text description. This may take a few minutes.",
    });

    try {
      // Placeholder for actual API integration
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo purposes, we'll just set a dummy URL
      // In production, this would be the URL returned from the API
      setModelUrl('/path/to/generated/model.glb');
      
      toast({
        title: "Model generated successfully",
        description: "Your 3D model is now ready to view!",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your 3D model. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Transform Text to 3D Models</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter detailed descriptions of Indian heritage monuments and watch as our AI generates interactive 3D models.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card shadow-xl overflow-hidden border">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-semibold text-xl text-card-foreground mb-6">Describe Your Monument</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="modelName">Model Name</Label>
                      <Input 
                        id="modelName" 
                        placeholder="e.g., Golden Temple, Amritsar" 
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea 
                        id="description" 
                        rows={6} 
                        placeholder="Describe the architecture, distinctive features, materials, colors, and any historical context..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="resize-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Style Preferences</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: 'realistic', label: 'Realistic' },
                          { id: 'stylized', label: 'Stylized' },
                          { id: 'detailed', label: 'Highly Detailed' },
                          { id: 'lowpoly', label: 'Low Poly' }
                        ].map((style) => (
                          <div key={style.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={style.id} 
                              checked={stylePreferences[style.id as keyof typeof stylePreferences]}
                              onCheckedChange={() => handleStyleChange(style.id as keyof typeof stylePreferences)}
                            />
                            <Label htmlFor={style.id} className="cursor-pointer">{style.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleGenerate} 
                      className="w-full"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <span className="animate-spin mr-2">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                            </svg>
                          </span>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-5 w-5" />
                          Generate 3D Model
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
                
                {/* Preview Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-full"
                >
                  <div className="animated-border h-full">
                    <BasicModelViewer modelName={modelName} isPreview={true} />
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 p-6 bg-muted/30 rounded-lg"
          >
            <h3 className="font-semibold text-xl mb-4">Tips for Better Results</h3>
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
              <li>Be as detailed as possible in your description</li>
              <li>Mention specific architectural features like domes, pillars, or carvings</li>
              <li>Include information about materials (marble, sandstone, etc.)</li>
              <li>Specify dimensions and proportions if known</li>
              <li>Reference historical periods or architectural styles</li>
              <li>Describe the surroundings or landscape elements</li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            <p>
              Our text-to-3D model conversion uses advanced AI techniques to interpret your descriptions.
              The quality of the output depends on the details you provide.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
