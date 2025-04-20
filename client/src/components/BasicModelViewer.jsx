import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, ZoomIn } from 'lucide-react';
import { Button } from './ui/button';

const BasicModelViewer = ({ modelName, isPreview = false }) => {
  const [is3DMode, setIs3DMode] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const modelRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current || !is3DMode) return;
    
    // Clean up any previous rendering
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    
    // Remove any existing canvas elements
    while (canvasRef.current.firstChild) {
      canvasRef.current.removeChild(canvasRef.current.firstChild);
    }
    
    // Set up the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      canvasRef.current.clientWidth / canvasRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 0, 10);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    canvasRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);
    
    // Add a grid
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);
    
    // Create a model based on the name
    modelRef.current = new THREE.Group();
    
    if (modelName?.toLowerCase().includes('taj')) {
      createTajMahal(modelRef.current);
    } else if (modelName?.toLowerCase().includes('qutub')) {
      createQutubMinar(modelRef.current);
    } else {
      createGenericMonument(modelRef.current);
    }
    
    scene.add(modelRef.current);
    
    // Animation function
    const animate = () => {
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }
      
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    requestRef.current = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      renderer.dispose();
      
      while (canvasRef.current?.firstChild) {
        canvasRef.current.removeChild(canvasRef.current.firstChild);
      }
    };
  }, [is3DMode, modelName]);
  
  // Create Taj Mahal
  const createTajMahal = (group) => {
    // Main dome
    const mainDome = new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshPhongMaterial({ color: 0xf8f8f8, shininess: 50 })
    );
    mainDome.position.y = 1;
    group.add(mainDome);
    
    // Dome tip
    const domeTip = new THREE.Mesh(
      new THREE.ConeGeometry(0.2, 0.5, 16),
      new THREE.MeshPhongMaterial({ color: 0xd4af37 })
    );
    domeTip.position.y = 2;
    group.add(domeTip);
    
    // Base structure
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(3, 1, 3),
      new THREE.MeshPhongMaterial({ color: 0xf0f0f0 })
    );
    base.position.y = 0;
    group.add(base);
    
    // Platform
    const platform = new THREE.Mesh(
      new THREE.BoxGeometry(5, 0.5, 5),
      new THREE.MeshPhongMaterial({ color: 0xe8e8e8 })
    );
    platform.position.y = -0.75;
    group.add(platform);
    
    // Four minarets
    const minaretPositions = [
      { x: 2, z: 2 },
      { x: 2, z: -2 },
      { x: -2, z: 2 },
      { x: -2, z: -2 }
    ];
    
    minaretPositions.forEach(pos => {
      // Minaret
      const minaret = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.3, 3, 16),
        new THREE.MeshPhongMaterial({ color: 0xf0f0f0 })
      );
      minaret.position.set(pos.x, 0.5, pos.z);
      group.add(minaret);
      
      // Minaret top
      const minaretTop = new THREE.Mesh(
        new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshPhongMaterial({ color: 0xf0f0f0 })
      );
      minaretTop.position.set(pos.x, 2, pos.z);
      group.add(minaretTop);
    });
  };
  
  // Create Qutub Minar
  const createQutubMinar = (group) => {
    // Base
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 2, 1, 32),
      new THREE.MeshPhongMaterial({ color: 0xd2b48c })
    );
    base.position.y = -3;
    group.add(base);
    
    // Tower sections with alternating colors
    const colors = [0xe8c39e, 0xd2a679, 0xe8c39e, 0xd2a679, 0xe8c39e];
    const heights = [1.5, 1.5, 1.3, 1.2, 1];
    let currentHeight = -2.5;
    
    for (let i = 0; i < 5; i++) {
      const topRadius = 0.9 - (i * 0.15);
      const bottomRadius = 1.1 - (i * 0.15);
      const height = heights[i];
      
      const section = new THREE.Mesh(
        new THREE.CylinderGeometry(topRadius, bottomRadius, height, 32),
        new THREE.MeshPhongMaterial({ color: colors[i] })
      );
      
      currentHeight += height / 2;
      section.position.y = currentHeight;
      currentHeight += height / 2;
      group.add(section);
      
      // Add decorative ring between sections (except last)
      if (i < 4) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(bottomRadius - 0.1, 0.1, 16, 32),
          new THREE.MeshPhongMaterial({ color: 0xb8860b })
        );
        ring.position.y = currentHeight + 0.05;
        ring.rotation.x = Math.PI / 2;
        group.add(ring);
      }
    }
    
    // Top finial
    const finial = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 1, 16),
      new THREE.MeshPhongMaterial({ color: 0xb8860b })
    );
    finial.position.y = currentHeight + 0.5;
    group.add(finial);
  };
  
  // Create a generic monument
  const createGenericMonument = (group) => {
    // Base
    const base = new THREE.Mesh(
      new THREE.BoxGeometry(5, 1, 5),
      new THREE.MeshPhongMaterial({ color: 0xd3d3d3 })
    );
    base.position.y = -2;
    group.add(base);
    
    // Structure
    const structure = new THREE.Mesh(
      new THREE.BoxGeometry(4, 3, 4),
      new THREE.MeshPhongMaterial({ color: 0xe8e8e8 })
    );
    structure.position.y = -0.5;
    group.add(structure);
    
    // Central dome
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshPhongMaterial({ color: 0xf8f8f8, shininess: 30 })
    );
    dome.position.y = 1;
    group.add(dome);
    
    // Pillars
    for (let x = -1.5; x <= 1.5; x += 3) {
      for (let z = -1.5; z <= 1.5; z += 3) {
        const pillar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.3, 3, 16),
          new THREE.MeshPhongMaterial({ color: 0xe0e0e0 })
        );
        pillar.position.set(x, -0.5, z);
        group.add(pillar);
      }
    }
  };
  
  // Get monument image for fallback
  const getMonumentImage = () => {
    if (modelName?.toLowerCase().includes('taj')) {
      return "/images/photo-1564507592333-c60657eea523.jpeg";
    } else if (modelName?.toLowerCase().includes('qutub')) {
      return "/images/qutub1_042717100950.jpg";
    } else {
      return "/images/photo-1564507592333-c60657eea523.jpeg"; // Default to Taj Mahal
    }
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
          <div ref={canvasRef} className="w-full h-full"></div>
        ) : (
          <div className="h-full flex items-center justify-center p-4">
            <div className="max-w-full max-h-full relative group">
              <img
                src={getMonumentImage()}
                alt={modelName || "Heritage Monument"}
                className="max-h-full max-w-full object-contain rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => setIs3DMode(true)} 
                  className="bg-background/80 hover:bg-background/100"
                >
                  <Box className="h-4 w-4 mr-2" />
                  View in 3D
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Monument Name */}
      <div className="p-2 border-t bg-muted/30 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">{modelName || "Heritage Monument"}</h3>
          <p className="text-xs text-muted-foreground">
            {is3DMode ? 'Interactive 3D Model' : 'Image View'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BasicModelViewer;