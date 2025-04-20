import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three-obj-mtl-loader';
import { motion } from 'framer-motion';

interface ThreeJSCanvasProps {
  modelUrl?: string;
  placeholder?: boolean;
}

const ThreeJSCanvas = ({ modelUrl, placeholder = false }: ThreeJSCanvasProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const objectRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Creating scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf5f5f5);

    // Setting up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 5;

    // Setting up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    
    // Clear previous canvas if any
    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    
    mountRef.current.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enablePan = true;
    controls.enableZoom = true;

    // Add lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemiLight.position.set(0, 300, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(75, 300, -75);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 100;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.left = -100;
    dirLight.shadow.camera.right = 100;
    scene.add(dirLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Add a simple grid for reference
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
    };

    if (placeholder) {
      // Add placeholder geometry
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshStandardMaterial({ color: 0x1E3A8A });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      objectRef.current = cube;

      // Animation loop for placeholder
      const animatePlaceholder = () => {
        requestAnimationFrame(animatePlaceholder);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        renderer.render(scene, camera);
      };
      animatePlaceholder();
    } else if (modelUrl) {
      // Load 3D model from URL
      setIsLoading(true);
      console.log("Loading model from URL:", modelUrl);

      try {
        // Create a temporary placeholder while loading
        const tempGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const tempMaterial = new THREE.MeshStandardMaterial({ 
          color: 0x888888,
          wireframe: true
        });
        const tempSphere = new THREE.Mesh(tempGeometry, tempMaterial);
        scene.add(tempSphere);
        
        // Start the animation loop immediately
        animate();

        // Fetch the model file to make sure it exists
        fetch(modelUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Failed to fetch model: ${response.status} ${response.statusText}`);
            }
            return response.blob();
          })
          .then(blob => {
            // Create a URL for the blob
            const objectURL = URL.createObjectURL(blob);
            
            // Load the model using OBJLoader
            const objLoader = new OBJLoader();
            
            objLoader.load(
              objectURL,
              (object) => {
                // Success callback
                console.log("Model loaded successfully:", object);
                
                // Clean up the temporary URL
                URL.revokeObjectURL(objectURL);
                
                // Remove the temporary placeholder
                scene.remove(tempSphere);
                
                // Scale and center the loaded object properly
                object.scale.set(0.05, 0.05, 0.05); // Smaller scale for large models
                
                // Calculate bounding box
                const bbox = new THREE.Box3().setFromObject(object);
                const center = bbox.getCenter(new THREE.Vector3());
                const size = bbox.getSize(new THREE.Vector3());
                
                // Center the object
                object.position.set(-center.x, -center.y, -center.z);
                
                // Adjust camera position based on object size
                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
                cameraZ *= 2.0; // Zoom out a bit more
                camera.position.z = cameraZ;
                
                // Set camera limits
                const minZ = maxDim * 0.5;
                const maxZ = cameraZ * 5;
                controlsRef.current!.minDistance = minZ;
                controlsRef.current!.maxDistance = maxZ;
                
                // Update camera
                camera.near = 0.1;
                camera.far = cameraZ * 10;
                camera.updateProjectionMatrix();
                
                // Add the object to the scene
                scene.add(object);
                objectRef.current = object;
                
                // Add a simple rotation animation
                const rotateModel = () => {
                  if (objectRef.current) {
                    objectRef.current.rotation.y += 0.002;
                  }
                  requestAnimationFrame(rotateModel);
                };
                rotateModel();
                
                setIsLoading(false);
              },
              (xhr) => {
                // Progress callback
                const percentComplete = xhr.loaded / xhr.total * 100;
                console.log(`${percentComplete.toFixed(2)}% loaded`);
              },
              (error) => {
                // Error callback
                console.error('Error loading model:', error);
                setLoadingError(`Failed to load model: ${error.message}`);
                setIsLoading(false);
                // Clean up the temporary URL
                URL.revokeObjectURL(objectURL);
              }
            );
          })
          .catch(error => {
            console.error("Error fetching model:", error);
            setLoadingError(`Error fetching model: ${error.message}`);
            setIsLoading(false);
            
            // Show a fallback if loading fails
            scene.remove(tempSphere);
            const geometry = new THREE.BoxGeometry(2, 2, 2);
            const material = new THREE.MeshStandardMaterial({ 
              color: 0xEE3333,
              wireframe: true
            });
            const errorCube = new THREE.Mesh(geometry, material);
            scene.add(errorCube);
            objectRef.current = errorCube;
          });
      } catch (error) {
        console.error("Error in model loading process:", error);
        setLoadingError(`Error initializing model loader: ${error}`);
        setIsLoading(false);
        
        // Show a fallback if loading fails
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ 
          color: 0xEE3333,
          wireframe: true
        });
        const errorCube = new THREE.Mesh(geometry, material);
        scene.add(errorCube);
        objectRef.current = errorCube;
        
        animate();
      }
    } else {
      // If no model URL, just animate a simple scene
      animate();
    }

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (objectRef.current) {
        if (objectRef.current.geometry) {
          objectRef.current.geometry.dispose();
        }
        
        if (objectRef.current.material) {
          if (Array.isArray(objectRef.current.material)) {
            objectRef.current.material.forEach(material => material.dispose());
          } else {
            objectRef.current.material.dispose();
          }
        }
        
        scene.remove(objectRef.current);
      }
    };
  }, [modelUrl, placeholder]);

  return (
    <motion.div 
      ref={mountRef} 
      className="w-full h-full rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-2"></div>
            <p className="text-sm font-medium">Loading 3D Model...</p>
          </div>
        </div>
      )}
      
      {loadingError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="bg-destructive/10 text-destructive p-4 rounded-md max-w-xs text-center">
            <p className="font-medium mb-1">Error Loading Model</p>
            <p className="text-sm">{loadingError}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ThreeJSCanvas;
