import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Box, Info, ZoomIn, RotateCcw, RefreshCw, Loader } from 'lucide-react';
import { Button } from './ui/button';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface ModelViewerProps {
  modelUrl?: string;
  isPreview?: boolean;
  name?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ modelUrl, isPreview = false, name }) => {
  const [is3DMode, setIs3DMode] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Generate the correct URL for the model file
  const fullModelUrl = useMemo(() => {
    if (!modelUrl) return undefined;
    
    // Check if the URL already starts with http/https or /
    if (modelUrl.startsWith('http') || modelUrl.startsWith('/')) {
      return modelUrl;
    }
    
    // Otherwise, prepend the path to the models folder
    return `/models/${modelUrl}`;
  }, [modelUrl]);
  
  // Set up the 3D scene
  useEffect(() => {
    if (!canvasRef.current || !is3DMode) return;
    
    // Clean up previous scene
    if (rendererRef.current && canvasRef.current.contains(rendererRef.current.domElement)) {
      canvasRef.current.removeChild(rendererRef.current.domElement);
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Create new scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    rendererRef.current = renderer;
    canvasRef.current.appendChild(renderer.domElement);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Create controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controlsRef.current = controls;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create a monument model based on name
    let geometry: THREE.BufferGeometry;
    
    if (name?.toLowerCase().includes('taj mahal') || modelUrl?.toLowerCase().includes('taj')) {
      // Simple Taj Mahal-like dome
      geometry = new THREE.CapsuleGeometry(1, 1.5, 8, 16);
      
      // Add a base
      const baseGeometry = new THREE.BoxGeometry(3, 0.5, 3);
      const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xf5f5f5 });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = -1.5;
      scene.add(base);
      
      // Add minarets
      for (let i = 0; i < 4; i++) {
        const pillarGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 8);
        const pillarMaterial = new THREE.MeshPhongMaterial({ color: 0xf5f5f5 });
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
        
        const angle = (i * Math.PI / 2);
        pillar.position.x = 1.8 * Math.cos(angle);
        pillar.position.z = 1.8 * Math.sin(angle);
        pillar.position.y = -0.25;
        scene.add(pillar);
      }
      
    } else if (name?.toLowerCase().includes('qutub minar') || modelUrl?.toLowerCase().includes('qutub')) {
      // Simple Qutub Minar-like tower
      geometry = new THREE.CylinderGeometry(0.5, 0.8, 4, 12);
      
      // Add base
      const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 12);
      const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xd2b48c });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = -2;
      scene.add(base);
      
      // Add details to the tower
      for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.TorusGeometry(0.5 + (0.1 * i), 0.1, 8, 24);
        const ringMaterial = new THREE.MeshPhongMaterial({ color: 0xd2b48c });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = -1 + (i * 1.3);
        scene.add(ring);
      }
      
    } else {
      // Generic monument
      geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    }
    
    // Create material
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xf5f5f5,
      specular: 0x333333,
      shininess: 30,
    });
    
    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    
    // Animation function
    const animate = () => {
      mesh.rotation.y += 0.005;
      controls.update();
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      rendererRef.current?.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      sceneRef.current = null;
    };
  }, [is3DMode, name, modelUrl, canvasRef.current]);

  // Get monument image for fallback
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

  // Handle toggling between 3D and image views
  const toggleViewMode = () => {
    setIs3DMode(!is3DMode);
  };

  // For preview mode (in grid cards)
  if (isPreview) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-2">
          <Box className="h-8 w-8 text-primary" />
        </div>
        <p className="text-xs text-center text-muted-foreground">
          Interactive 3D Model<br/>Available
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex flex-col overflow-hidden ${
      isFullScreen ? 'fixed inset-0 z-50 bg-background p-4' : ''
    }`}>
      {/* Controls */}
      <div className="p-2 border-b flex items-center justify-between bg-muted/30">
        <div className="flex items-center space-x-2">
          <Button 
            variant={is3DMode ? "default" : "outline"} 
            size="sm" 
            onClick={() => setIs3DMode(true)}
            className={is3DMode ? "bg-primary text-primary-foreground" : ""}
          >
            <Box className="h-4 w-4 mr-2" />
            3D View
          </Button>
          <Button 
            variant={!is3DMode ? "default" : "outline"} 
            size="sm" 
            onClick={() => setIs3DMode(false)}
            className={!is3DMode ? "bg-primary text-primary-foreground" : ""}
          >
            <ZoomIn className="h-4 w-4 mr-2" />
            Image View
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="rounded-full"
        >
          {isFullScreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 14 10 14 10 20"></polyline>
              <polyline points="20 10 14 10 14 4"></polyline>
              <line x1="14" y1="10" x2="21" y2="3"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
          )}
        </Button>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {is3DMode ? (
          <div className="h-full relative">
            <div ref={canvasRef} className="w-full h-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm">
                  <div className="bg-card p-4 rounded-lg shadow-lg">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-center font-medium">Loading 3D Model...</p>
                  </div>
                </div>
              )}
              
              {loadingError && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm">
                  <div className="bg-destructive/10 text-destructive p-4 rounded-md max-w-xs text-center">
                    <p className="font-medium mb-1">Error Loading Model</p>
                    <p className="text-sm">{loadingError}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-background/70 backdrop-blur-sm shadow-lg"
                title="Reset view"
                onClick={() => {
                  if (controlsRef.current && controlsRef.current.target) {
                    // Reset controls to initial position
                    controlsRef.current.target.set(0, 0, 0);
                    controlsRef.current.update();
                  }
                }}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-4">
            <div className="max-w-full max-h-full relative group">
              <img
                src={getMonumentImage()}
                alt={getMonumentName()}
                className="max-h-full max-w-full object-contain rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button variant="secondary" size="sm" className="shadow-lg">
                  <ZoomIn className="h-4 w-4 mr-2" />
                  View Full Size
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Info Bar */}
      <div className="p-3 border-t bg-muted/30">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium">{getMonumentName()}</h3>
            <p className="text-xs text-muted-foreground">
              {is3DMode ? 'Drag to rotate • Scroll to zoom • Right-click to pan' : 'Click for fullscreen view'}
            </p>
          </div>
          <Button variant="outline" size="sm" className="flex items-center ml-auto">
            <Info className="h-3 w-3 mr-1" />
            <span className="text-xs">More Info</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;
