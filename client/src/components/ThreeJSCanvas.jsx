import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { motion } from 'framer-motion';

const ThreeJSCanvas = ({ modelUrl, placeholder = false }) => {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

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
    
    // Clear previous canvas if any
    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    
    mountRef.current.appendChild(renderer.domElement);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    if (placeholder) {
      // Add placeholder geometry
      const geometry = new THREE.BoxGeometry(2, 2, 2);
      const material = new THREE.MeshStandardMaterial({ color: 0x1E3A8A });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Animation loop for placeholder
      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    } else if (modelUrl) {
      // Load 3D model here when available
      // This would use GLTFLoader or another appropriate loader
      console.log("Would load model from URL:", modelUrl);
      
      // Placeholder for now
      const geometry = new THREE.SphereGeometry(1.5, 32, 32);
      const material = new THREE.MeshStandardMaterial({ 
        color: 0x1E3A8A,
        metalness: 0.2,
        roughness: 0.5
      });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
      
      // Animation loop for model
      const animate = () => {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.005;
        controls.update();
        renderer.render(scene, camera);
      };
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
    };
  }, [modelUrl, placeholder]);

  return (
    <motion.div 
      ref={mountRef} 
      className="w-full h-full rounded-lg overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default ThreeJSCanvas;