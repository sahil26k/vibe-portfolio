"use client"

import React, { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PerspectiveCamera, MeshDistortMaterial, Float } from "@react-three/drei"
import * as THREE from "three"

function CyberGrid() {
  const { mouse } = useThree()
  const gridRef = useRef<THREE.Points>(null)
  
  const count = 40
  const separation = 0.4
  
  const [positions, initialY] = useMemo(() => {
    const pos = new Float32Array(count * count * 3)
    const iniY = new Float32Array(count * count)
    let i = 0
    for (let x = 0; x < count; x++) {
      for (let z = 0; z < count; z++) {
        const xPos = (x - count / 2) * separation
        const zPos = (z - count / 2) * separation
        pos[i * 3] = xPos
        pos[i * 3 + 1] = 0
        pos[i * 3 + 2] = zPos
        iniY[i] = 0
        i++
      }
    }
    return [pos, iniY]
  }, [])

  useFrame((state) => {
    if (!gridRef.current) return
    const time = state.clock.getElapsedTime()
    const pos = gridRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count * count; i++) {
      const x = pos[i * 3]
      const z = pos[i * 3 + 2]
      
      // Wave effect
      const dist = Math.sqrt(x * x + z * z)
      const ripple = Math.sin(dist * 2 - time * 2) * 0.2
      
      // Mouse interaction
      const mouseDist = Math.sqrt(
        Math.pow(x - mouse.x * 10, 2) + Math.pow(z - mouse.y * 10, 2)
      )
      const mouseForce = Math.max(0, (2 - mouseDist) * 0.5)
      
      pos[i * 3 + 1] = ripple + mouseForce
    }
    gridRef.current.geometry.attributes.position.needsUpdate = true
  })

  return React.createElement("points", { ref: gridRef },
    React.createElement("bufferGeometry", null,
      React.createElement("bufferAttribute", {
        attach: "attributes-position",
        count: positions.length / 3,
        array: positions,
        itemSize: 3,
      })
    ),
    React.createElement("pointsMaterial", {
      size: 0.05,
      color: "#3b82f6",
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    })
  )
}

function FloatingOrbs() {
  return React.createElement(React.Fragment, null,
    React.createElement(Float, { speed: 4, rotationIntensity: 1, floatIntensity: 2 },
      React.createElement("mesh", { position: [5, 2, -5] },
        React.createElement("sphereGeometry", { args: [0.5, 32, 32] }),
        React.createElement("meshStandardMaterial", { color: "#3b82f6", emissive: "#3b82f6", emissiveIntensity: 2 })
      )
    ),
    React.createElement(Float, { speed: 3, rotationIntensity: 1, floatIntensity: 2 },
      React.createElement("mesh", { position: [-6, -3, -4] },
        React.createElement("sphereGeometry", { args: [0.8, 32, 32] }),
        React.createElement("meshStandardMaterial", { color: "#ef4444", emissive: "#ef4444", emissiveIntensity: 1 })
      )
    )
  )
}

export function Background3D() {
  return (
    <div className="absolute inset-0 -z-20 h-full w-full bg-background overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-background opacity-80 z-10 pointer-events-none" />
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 5, 12]} rotation={[-0.4, 0, 0]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <CyberGrid />
        <FloatingOrbs />
      </Canvas>
      <style jsx>{`
        .bg-radial-gradient {
          background: radial-gradient(circle at center, transparent 0%, var(--background) 80%);
        }
      `}</style>
    </div>
  )
}
