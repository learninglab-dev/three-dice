/** @jsxImportSource theme-ui */
import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { PerspectiveCamera, RoundedBox, Box, Plane } from '@react-three/drei'

const Dice = (props) => {
  const mesh = useRef()
  useFrame(() => {
    mesh.current.rotation.y += 0.004;
    mesh.current.rotation.x += 0.004;
    mesh.current.rotation.z += 0.004;
  });
  return (
    <RoundedBox
      {...props}
      ref={mesh}
      args={[1,1,1]}
      radius={0.05}
      >
      <meshStandardMaterial attach="material" color='red'/>
    </RoundedBox>
  )
}

const Scene = () => {
  return (
    <>
      <Dice castShadow receiveShadow/>
      <Plane args={[1000,1000]} receiveShadow position={[0,-2,0]} rotation={[-Math.PI/2,0,0]}>
        <meshStandardMaterial attach="material" color="white" />
      </Plane>
    </>
  )
}

const ThreeCanvas = ({roll}) => {
  return (
    <Canvas shadowMap>
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      {/*<PerspectiveCamera makeDefault fov={60} position={[0,0,0]}/>*/}
      <Scene/>
    </Canvas>
  )
}

export default ThreeCanvas;
