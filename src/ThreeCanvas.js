/** @jsxImportSource theme-ui */
import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { PerspectiveCamera, RoundedBox, Box, Plane } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useStore } from "./App";

const Dice = (props) => {
  const setRoll = useStore((state) => state.setRoll);
  const setDicePos = useStore((state) => state.setDicePos);
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    ...props,
  }));

  const velocity = useRef(null);
  const position = useRef(null);
  const cameraNeedsUpdate = useRef(true);

  const updateCamera = () => {
    if (cameraNeedsUpdate.current === true) {
      setDicePos({
        x: position.current[0],
        y: position.current[1],
        z: position.current[2],
      });
      console.log("moved camera");
      console.log(position.current);
    }
  };

  const handleVelocityChange = (v) => {
    velocity.current = v;
    if (
      Math.abs(velocity.current[0]) < 0.1 &&
      Math.abs(velocity.current[1]) < 0.1 &&
      Math.abs(velocity.current[2]) < 0.1
    ) {
      updateCamera();
      cameraNeedsUpdate.current = false;
    }
  };

  const getRandFloat = (low, high) => {
    const result = Math.random() * (high - low) + low;
    return result;
  };

  useEffect(() => {
    if (api) {
      const roll = () => {
        cameraNeedsUpdate.current = true;
        console.log("roll set!");
        api.applyLocalForce(
          [0, getRandFloat(300, 600), 0],
          [getRandFloat(0, 0.5), 0, getRandFloat(0, 0.5)]
        );
      };
      setRoll(roll);
      api.velocity.subscribe((v) => handleVelocityChange(v));
      api.position.subscribe((p) => (position.current = p));
    }
  }, [api]);

  return (
    <RoundedBox {...props} ref={ref} args={[1, 1, 1]} radius={0.05}>
      <meshStandardMaterial attach="material" color="red" />
    </RoundedBox>
  );
};

const Ground = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
    ...props,
  }));
  return (
    <Plane ref={ref} args={[1000, 1000]} receiveShadow>
      <meshStandardMaterial attach="material" color="white" />
    </Plane>
  );
};

const Scene = () => {
  return (
    <>
      <Dice castShadow receiveShadow />
      <Ground />
    </>
  );
};

const AimCamera = ({ lookAt }) => {
  const camHeight = 5;
  const dicePos = useStore((state) => state.dicePos);
  const cam = useRef();
  useEffect(() => {
    cam.current.lookAt(lookAt.x, lookAt.y, lookAt.z);
  }, []);

  if (cam.current) {
    console.log(cam.current.rotation);
  }
  const { camPosition } = useSpring({
    camPosition: [dicePos.x, camHeight, dicePos.z],
  });

  return (
    <animated.mesh position={camPosition}>
      <PerspectiveCamera makeDefault ref={cam} fov={60} />
    </animated.mesh>
  );
};

const ThreeCanvas = ({ roll }) => {
  const lookAt = useStore((state) => state.lookAt);
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
      />
      <AimCamera lookAt={lookAt} />
      <Physics>
        <Scene />
      </Physics>
    </Canvas>
  );
};

export default ThreeCanvas;
