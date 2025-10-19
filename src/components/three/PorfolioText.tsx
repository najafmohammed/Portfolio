'use client'

import React, { useEffect, useRef } from 'react'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

export function PortfolioText() {
    const textGroupRef = useRef<THREE.Group>(null!)
    const linesRef = useRef<THREE.Mesh[]>([])

    const texts = [
        'Full Stack Developer',
        "Over-engineering solutions",
        "Probably watching anime",
        "Listening to copious amounts of music",
    ]

    useEffect(() => {
        if (!textGroupRef.current) return

        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2.5 })

        linesRef.current.forEach((line, i) => {
            timeline.set(line, { visible: true, opacity: 0, y: -0.5 })

            // Animate in
            timeline.to(
                line.position,
                { y: 0, duration: 3, ease: 'power2.out' },
                i * 3.5 // stagger start times
            )
            timeline.to(
                line.material,
                { opacity: 1, duration: 3, ease: 'power2.out' },
                i * 3.5
            )

            // Animate out
            timeline.to(
                line.position,
                { y: 0.5, duration: 3, ease: 'power2.in' },
                i * 3.5 + 1
            )
            timeline.to(
                line.material,
                { opacity: 0, duration: 3, ease: 'power2.in' },
                i * 3.5 + 1
            )
        })
    }, [])

    return (
        <group ref={textGroupRef} position={[0, 2, 0]} rotation={[0, Math.PI * 1.35, 0]}>
            {texts.map((txt, idx) => (
                <Text
                    key={idx}
                    ref={(el) => el && (linesRef.current[idx] = el)}
                    position={[0, 0, 0]}
                    fontSize={0.3}
                    color="#000000"
                    anchorX="center"
                    anchorY="middle"
                    material-transparent
                    material-opacity={0} // start invisible
                    maxWidth={4} // keep text within screen
                    lineHeight={1.1}
                    textAlign="center"
                >
                    {txt}
                </Text>
            ))}
        </group>
    )
}
