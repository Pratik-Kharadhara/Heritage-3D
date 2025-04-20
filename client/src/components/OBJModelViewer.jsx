import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Button } from './ui/button';

const OBJModelViewer = ({ modelUrl }) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    let scene, camera, renderer, controls;
    let requestId = null;
    
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // Create camera
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);
    
    // Add orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    
    // For debugging
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);
    
    // Load model
    if (modelUrl) {
      const loader = new OBJLoader();
      loader.load(
        modelUrl,
        (object) => {
          // Success callback
          // Get the bounding box of the loaded object
          const box = new THREE.Box3().setFromObject(object);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          
          // Scale the object to fit the view
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 3 / maxDim;
          object.scale.set(scale, scale, scale);
          
          // Center the object
          object.position.x = -center.x * scale;
          object.position.y = -center.y * scale;
          object.position.z = -center.z * scale;
          
          // Add the object to the scene
          scene.add(object);
          
          // Set camera position based on object
          camera.position.z = 5;
          
          // Animation loop
          function animate() {
            requestId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
          }
          
          setLoading(false);
          animate();
        },
        // Progress callback
        (xhr) => {
          const loadingProgress = Math.floor((xhr.loaded / xhr.total) * 100);
          console.log(`${loadingProgress}% loaded`);
        },
        // Error callback
        (err) => {
          console.error('Error loading model:', err);
          setError('Failed to load 3D model');
          setLoading(false);
        }
      );
    } else {
      // No modelUrl provided
      setError('No model URL provided');
      setLoading(false);
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      if (controls) {
        controls.dispose();
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [modelUrl]);
  
  return (
    <div className="w-full h-full flex flex-col">
      <div 
        ref={mountRef} 
        className="w-full h-full flex-1 relative min-h-[300px]"
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="flex flex-col items-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading 3D model...</p>
            </div>
          </div>
        )}
        
        {error && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 p-4">
            <p className="text-lg text-destructive mb-2">Error</p>
            <p className="text-sm text-muted-foreground mb-4 text-center">{error}</p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.reload()}
              >
                Reload
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OBJModelViewer;