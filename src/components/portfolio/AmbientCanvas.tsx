"use client"

import React, { useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

function Aura() {
  const meshRef = React.useRef<THREE.Mesh>(null)
  
    const uniforms = useMemo(() => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#d4c4a8") },
      uColor2: { value: new THREE.Color("#c9b896") },
      uColor3: { value: new THREE.Color("#e8dcc8") },
    }), [])

    useFrame((state) => {
      if (!meshRef.current) return
      const { clock } = state
      uniforms.uTime.value = clock.getElapsedTime()
    })

    return (
      <mesh ref={meshRef} scale={1.5}>
        <planeGeometry args={[2, 2, 64, 64]} />
        <shaderMaterial
          transparent
          uniforms={uniforms}
          vertexShader={`
            varying vec2 vUv;
            varying float vDistortion;
            uniform float uTime;
            
            void main() {
              vUv = uv;
              vec3 pos = position;
              float distortion = sin(pos.x * 1.5 + uTime * 0.3) * cos(pos.y * 1.5 + uTime * 0.3) * 0.25;
              pos.z += distortion;
              vDistortion = distortion;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            varying float vDistortion;
            uniform float uTime;
            
            void main() {
              vec3 color1 = vec3(0.83, 0.77, 0.66);
              vec3 color2 = vec3(0.79, 0.72, 0.59);
              vec3 color3 = vec3(0.91, 0.86, 0.78);
              
              float mix1 = vUv.y + vDistortion * 1.5;
              float mix2 = vUv.x + sin(uTime * 0.2) * 0.5;
              
              vec3 finalColor = mix(color1, color2, clamp(mix1, 0.0, 1.0));
              finalColor = mix(finalColor, color3, clamp(mix2 * 0.3, 0.0, 1.0));
              
              float alpha = smoothstep(1.2, 0.1, length(vUv - 0.5) * 2.0);
              gl_FragColor = vec4(finalColor, alpha * 0.25);
            }
          `}
        />
      </mesh>
    )

}

export function AmbientCanvas() {
  return (
    <div className="absolute inset-0 -z-20 h-full w-full bg-background overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Aura />
      </Canvas>
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[100px]" />
    </div>
  )
}
