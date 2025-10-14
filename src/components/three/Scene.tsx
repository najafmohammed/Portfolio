/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Sky, Environment, useGLTF, useProgress, Trail, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { useLoader } from '@/components/ui/LoaderProvider'
import { EffectComposer, GodRays } from '@react-three/postprocessing'
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js'
import { PortfolioText } from './PorfolioText'

/** -------------------- 3D Scene Elements -------------------- **/

function Island() {
  const { scene: treeScene } = useGLTF('/models/s_tree.glb')
  const { scene: baseScene } = useGLTF('/models/base.glb')

  return (
    <group position={[0, -1, 0]}>
      <WindyTree model={treeScene} scale={3.5} position={[-3.7, 0.1, -1.75]} />
      <primitive object={baseScene} scale={0.3} position={[-3.7, 0.1, -1.75]} />
    </group>
  )
}

/** -------------------- Wind Trail -------------------- **/
function WindLine() {
  const ref = useRef<THREE.Mesh>(null!)
  const pos = useRef<THREE.Vector3>(new THREE.Vector3())
  const simplex = useMemo(() => new SimplexNoise(), [])

  const rnda = Math.random()
  const rndb = Math.random()
  const rndc = Math.random()
  const rndd = Math.random()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3
    const x = 10 * Math.sin(5 * rnda * t + 6 * rndb)
    const y = 1 + simplex.noise(x * 0.2, t * 0.1) // floating above ground
    const z = 10 * Math.cos(5 * rndc * t + 6 * rndd)

    pos.current.set(x, y, z)
    if (ref.current) ref.current.position.copy(pos.current)
  })

  return (
    <Trail
      width={0.15}
      length={5}
      color="white"
      decay={0.02}
      attenuation={(t) => t * t}
      target={ref}
    >
      <Sphere ref={ref} args={[0.02, 8, 8]}>
        <meshBasicMaterial color="white" transparent opacity={0.5} />
      </Sphere>
    </Trail>
  )
}

/** -------------------- Sky + God Rays -------------------- **/

function SkyWithGodRays() {
  const skyRef = useRef<any>(null)
  const sunMesh = useRef<THREE.Mesh>(null!)
  const sunPos = useRef(new THREE.Vector3(60, 0.1, 30))

  useEffect(() => {
    gsap.to(sunPos.current, {
      y: 3,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (skyRef.current) {
          skyRef.current.material.uniforms.sunPosition.value.copy(sunPos.current)
        }
        if (sunMesh.current) {
          sunMesh.current.position.copy(sunPos.current)
        }
      },
    })
  }, [])

  return (
    <>
      <Sky
        ref={skyRef}
        sunPosition={sunPos.current.toArray()}
        turbidity={5}
        rayleigh={3}
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
      />

      <mesh ref={sunMesh} position={sunPos.current}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#fff8e1" />
      </mesh>

      <EffectComposer>
        <GodRays
          sun={sunMesh}
          samples={5}
          density={0.95}
          decay={0.96}
          weight={0.9}
          exposure={0.3}
        />
      </EffectComposer>
    </>
  )
}

/** -------------------- Windy Tree -------------------- **/
interface WindyTreeProps {
  model: THREE.Group;
  scale?: number;
  position?: [number, number, number];
}

export function WindyTree({
  model,
  scale = 4,
  position = [-3.7, 0.1, -1.75],
}: WindyTreeProps) {
  const ref = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!ref.current) return
    ref.current.traverse((child: any) => {
      if (child.isMesh) {
        if (!child.material.userData.originalOnBeforeCompile) {
          child.material.userData.originalOnBeforeCompile = child.material.onBeforeCompile
          child.material.onBeforeCompile = (shader: { uniforms: { uTime: { value: number } }; vertexShader: string }) => {
            shader.uniforms.uTime = { value: 0 }
            shader.vertexShader = shader.vertexShader.replace(
              '#include <common>',
              `#include <common>
               uniform float uTime;
              `
            )
            shader.vertexShader = shader.vertexShader.replace(
              '#include <begin_vertex>',
              `
              vec3 transformed = vec3(position);
              float windStrength = .75;
                transformed.x += sin(position.y * 0.5 + uTime * .5) * windStrength;
                transformed.z += cos(position.y * 0.5 + uTime * .5) * windStrength;
              `
            )
            child.material.userData.shader = shader
          }
        }
        if (child.material.userData.shader) {
          child.material.userData.shader.uniforms.uTime.value = t
        }
      }
    })
  })

  return <primitive object={model} ref={ref} scale={scale} position={position} />
}

/** -------------------- Water Plane -------------------- **/

export function WaterPlane() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pos = ref.current.geometry.attributes.position
    const original = (ref.current.geometry as any).userData.original
    if (!original) {
      (ref.current.geometry as any).userData.original = pos.array.slice()
    }
    const orig = (ref.current.geometry as any).userData.original
    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3
      const x = orig[ix]
      const y = orig[ix + 1]
      pos.array[ix + 2] = Math.sin(x * 5 + t * 5.7) * 0.2 + Math.cos(y * 5 + t * 5.7) * 0.2
    }
    pos.needsUpdate = true
  })

  return (
    <mesh
      ref={ref}
      rotation-x={-Math.PI / 2}
      position-y={-1.2}
      receiveShadow
    >
      <circleGeometry args={[100, 128]} />
      <meshPhysicalMaterial
        color="#4faaff"
        transmission={0.9}
        roughness={0.5}
        metalness={0.1}
        thickness={.6}
        envMapIntensity={0}
        clearcoat={0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}

/** -------------------- Main Scene -------------------- **/

const Scene = () => {
  const { hideLoader } = useLoader()
  const [webglReady, setWebglReady] = useState(false)
  const { loaded, total } = useProgress()

  useEffect(() => {
    if (webglReady && loaded === total) hideLoader()
  }, [webglReady, loaded, total, hideLoader])

  const windLines = useMemo(() => new Array(20).fill(0), [])

  return (
    <div className="h-screen w-full bg-black">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true }}
        onCreated={() => setWebglReady(true)}
        shadows
      >
        <color attach="background" args={['#000']} />
        <PerspectiveCamera rotation={[0, Math.PI * 1.35, 0]} makeDefault position={[-6, 0, -3]} fov={55} />

        <Suspense fallback={null}>
          <PortfolioText />
          <SkyWithGodRays />
          <Environment preset="dawn" />
          <Island />
          <WaterPlane />
          {windLines.map((_, i) => (
            <WindLine key={i} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
