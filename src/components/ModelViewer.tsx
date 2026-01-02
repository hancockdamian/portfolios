"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface ModelViewerProps {
  src: string;
  width?: string | number;
  height?: string | number;
}

function RotatingModel({ src, rotating }: { src: string; rotating: boolean }) {
  const gltf = useLoader(GLTFLoader, src);
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Frame and center the model once it's loaded
  useEffect(() => {
    if (!ref.current) return;

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(ref.current);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Recenter model to origin
    ref.current.position.x += -center.x;
    ref.current.position.y += -center.y;
    ref.current.position.z += -center.z;

    // Calculate camera distance based on model size and FOV
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = (camera.fov * Math.PI) / 180;
    const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

    camera.position.z = cameraZ * 1.2; // Add a bit of padding
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [gltf, camera]);

  useFrame(() => {
    if (rotating && ref.current) {
      ref.current.rotation.y += 0.007;
    }
  });

  return <primitive object={gltf.scene} ref={ref} />;
}

export default function ModelViewer({ src, width = 600, height = 600 }: ModelViewerProps) {
  const [rotating, setRotating] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div style={{ width, height }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <RotatingModel src={src} rotating={rotating} />
        </Canvas>
      </div>

      <button
        onClick={() => setRotating((r) => !r)}
        className="px-2 py-1 bg-black text-white rounded-md hover:bg-gray-800 transition"
      >
        {rotating ? "Stop Rotation" : "Start Rotation"}
      </button>
    </div>
  );
}