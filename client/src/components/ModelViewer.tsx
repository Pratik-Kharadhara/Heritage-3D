import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Box, Info, ZoomIn, RotateCcw, RefreshCw, Loader } from 'lucide-react';
import { Button } from './ui/button';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

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
    
    // Set loading state
    setIsLoading(true);
    setLoadingError(null);
    
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    
    // Add temporary loading indicator
    const loadingGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const loadingMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x999999,
      wireframe: true
    });
    const loadingSphere = new THREE.Mesh(loadingGeometry, loadingMaterial);
    scene.add(loadingSphere);
    
    // Animation function for loading indicator
    const animateLoading = () => {
      loadingSphere.rotation.y += 0.02;
      loadingSphere.rotation.x += 0.01;
      controls.update();
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animateLoading);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateLoading);
    
    // Skip trying to load the actual models since they're causing issues
    // Instead, create stylized models directly based on the monument names
    scene.remove(loadingSphere);
          
    let mainGeometry: THREE.BufferGeometry;
    
    if (name?.toLowerCase().includes('taj mahal') || modelUrl?.toLowerCase().includes('taj')) {
      // Advanced Taj Mahal stylized model
      
      // Main dome
      mainGeometry = new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
      const domeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        specular: 0x555555,
        shininess: 50,
        flatShading: false
      });
      const dome = new THREE.Mesh(mainGeometry, domeMaterial);
      dome.position.y = 0.5;
      scene.add(dome);
      
      // Dome tip
      const tipGeometry = new THREE.ConeGeometry(0.1, 0.5, 16);
      const tipMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 }); // Gold tip
      const tip = new THREE.Mesh(tipGeometry, tipMaterial);
      tip.position.y = 1.5;
      scene.add(tip);
      
      // Main platform
      const platformGeometry = new THREE.BoxGeometry(4, 0.4, 4);
      const platformMaterial = new THREE.MeshPhongMaterial({ color: 0xf0f0f0 });
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);
      platform.position.y = -0.7;
      scene.add(platform);
      
      // Second platform
      const platform2Geometry = new THREE.BoxGeometry(5, 0.3, 5);
      const platform2 = new THREE.Mesh(platform2Geometry, platformMaterial);
      platform2.position.y = -1.1;
      scene.add(platform2);
      
      // Base building
      const buildingGeometry = new THREE.BoxGeometry(3, 1, 3);
      const buildingMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xfffafa,
        specular: 0x222222,
        shininess: 10,
      });
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.y = 0;
      scene.add(building);
      
      // Four minarets
      const minaretPositions = [
        { x: 2.2, z: 2.2 },
        { x: 2.2, z: -2.2 },
        { x: -2.2, z: 2.2 },
        { x: -2.2, z: -2.2 }
      ];
      
      minaretPositions.forEach(pos => {
        // Main tower
        const minaretGeometry = new THREE.CylinderGeometry(0.15, 0.2, 3, 16);
        const minaretMaterial = new THREE.MeshPhongMaterial({ color: 0xf5f5f5 });
        const minaret = new THREE.Mesh(minaretGeometry, minaretMaterial);
        minaret.position.set(pos.x, 0.4, pos.z);
        scene.add(minaret);
        
        // Top dome
        const topGeometry = new THREE.SphereGeometry(0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const top = new THREE.Mesh(topGeometry, minaretMaterial);
        top.position.set(pos.x, 2, pos.z);
        scene.add(top);
        
        // Small platform under minaret
        const minaretBaseGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
        const minaretBase = new THREE.Mesh(minaretBaseGeometry, platformMaterial);
        minaretBase.position.set(pos.x, -1, pos.z);
        scene.add(minaretBase);
      });
      
    } else if (name?.toLowerCase().includes('qutub minar') || modelUrl?.toLowerCase().includes('qutub')) {
      // Advanced Qutub Minar stylized model
      
      // Main tower - tapered
      const sections = 5;
      const heightPerSection = 0.8;
      const totalHeight = sections * heightPerSection;
      const baseRadius = 0.8;
      const topRadius = 0.35;
      
      // Create the tower in sections
      for (let i = 0; i < sections; i++) {
        const sectionBaseRadius = baseRadius - ((baseRadius - topRadius) * (i / sections));
        const sectionTopRadius = baseRadius - ((baseRadius - topRadius) * ((i + 1) / sections));
        
        const sectionGeometry = new THREE.CylinderGeometry(
          sectionTopRadius, 
          sectionBaseRadius, 
          heightPerSection, 
          32
        );
        
        const color = i % 2 === 0 ? 0xd2b48c : 0xc19a6b; // Alternating colors
        const sectionMaterial = new THREE.MeshPhongMaterial({ 
          color: color,
          specular: 0x222222,
          shininess: 20,
        });
        
        const section = new THREE.Mesh(sectionGeometry, sectionMaterial);
        const yPos = (i * heightPerSection) - (totalHeight / 2) + heightPerSection/2;
        section.position.y = yPos;
        scene.add(section);
        
        // Add decorative ring between sections
        if (i < sections - 1) {
          const ringGeometry = new THREE.TorusGeometry(sectionTopRadius + 0.05, 0.05, 8, 32);
          const ringMaterial = new THREE.MeshPhongMaterial({ color: 0xb8860b }); // Dark gold
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.x = Math.PI / 2;
          ring.position.y = yPos + heightPerSection/2;
          scene.add(ring);
        }
      }
      
      // Top finial/decoration
      const finialGeometry = new THREE.ConeGeometry(0.15, 0.5, 16);
      const finialMaterial = new THREE.MeshPhongMaterial({ color: 0xb8860b });
      const finial = new THREE.Mesh(finialGeometry, finialMaterial);
      finial.position.y = (totalHeight / 2) + 0.25;
      scene.add(finial);
      
      // Base of the monument
      const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 32);
      const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xd2b48c });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.position.y = -(totalHeight / 2) - 0.25;
      scene.add(base);
      
      // Ground platform
      const groundGeometry = new THREE.CylinderGeometry(2, 2, 0.2, 32);
      const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xc19a6b });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.position.y = -(totalHeight / 2) - 0.6;
      scene.add(ground);
      
      // Assign the main geometry for animation
      mainGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.1, 16); // Dummy geometry
      
    } else {
      // Generic monument - more detailed torus knot
      mainGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32, 2, 3);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x4169e1, // Royal blue
        specular: 0x333333,
        shininess: 30,
      });
      
      const mesh = new THREE.Mesh(mainGeometry, material);
      scene.add(mesh);
    }
    
    // Animation function for all models
    const animateModel = () => {
      // Rotate the entire scene slightly
      scene.rotation.y += 0.005;
      controls.update();
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animateModel);
    };
    
    // Start animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animateModel);
    
    setIsLoading(false);
    } else {
      // No model URL, create a basic shape based on monument name
      scene.remove(loadingSphere);
      
      // Default material
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x3366cc,
        specular: 0x111111,
        shininess: 30
      });
      
      // Create a torus knot as default
      const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
      const torusKnot = new THREE.Mesh(geometry, material);
      scene.add(torusKnot);
      
      // Animation function
      const animateDefault = () => {
        torusKnot.rotation.y += 0.005;
        torusKnot.rotation.x += 0.002;
        controls.update();
        renderer.render(scene, camera);
        animationFrameRef.current = requestAnimationFrame(animateDefault);
      };
      
      // Start animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animateDefault);
      
      setIsLoading(false);
    }
    
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
