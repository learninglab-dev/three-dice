/** @jsxImportSource theme-ui */
import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import {
  PerspectiveCamera,
  Box,
  Plane,
  useTexture,
  useCubeTexture,
} from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useStore } from "./App";
import * as THREE from "three";
import pokertable from "./pokertable.jpeg";
import faceOne from "./diceFaces/one.png";
import faceTwo from "./diceFaces/two.png";
import faceThree from "./diceFaces/three.png";
import faceFour from "./diceFaces/four.png";
import faceFive from "./diceFaces/five.png";
import faceSix from "./diceFaces/six.png";

const Dice = (props) => {
  const texture1 = useTexture(faceOne);
  const texture2 = useTexture(faceTwo);
  const texture3 = useTexture(faceThree);
  const texture4 = useTexture(faceFour);
  const texture5 = useTexture(faceFive);
  const texture6 = useTexture(faceSix);
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
      Math.abs(velocity.current[0]) < 0.15 &&
      Math.abs(velocity.current[1]) < 0.15 &&
      Math.abs(velocity.current[2]) < 0.15
    ) {
      updateCamera();
      cameraNeedsUpdate.current = false;
    }
    // console.log(v);
  };

  const getRandFloat = (low, high) => {
    const result = Math.random() * (high - low) + low;
    return result;
  };

  const getSign = (float) => {
    const result = Math.random() < 0.5 ? -1 : 1;
    return result * float;
  };
  console.log(ref.current);

  useEffect(() => {
    const updatePosAndCamera = (p) => {
      setDicePos({
        x: p[0],
        y: p[1],
        z: p[2],
      });
      position.current = p;
    };
    // console.log(v);

    console.log("effect!");
    if (api) {
      const roll = () => {
        cameraNeedsUpdate.current = true;
        console.log("roll set!");
        api.applyImpulse(
          [getRandFloat(-5, 5), getRandFloat(10, 20), getRandFloat(-5, 5)],
          [getRandFloat(-0.1, 0.1), 0, getRandFloat(-0.1, 0.1)]
        );
      };
      setRoll(roll);
      // api.velocity.subscribe((v) => handleVelocityChange(v));
      api.position.subscribe((p) => updatePosAndCamera(p));
    }
  }, [api]);

  return (
    <Box {...props} ref={ref} args={[1, 1, 1]} radius={0.05}>
      <meshStandardMaterial attachArray="material" map={texture1} />
      <meshStandardMaterial attachArray="material" map={texture2} />
      <meshStandardMaterial attachArray="material" map={texture3} />
      <meshStandardMaterial attachArray="material" map={texture4} />
      <meshStandardMaterial attachArray="material" map={texture5} />
      <meshStandardMaterial attachArray="material" map={texture6} />
    </Box>
  );
};

const Ground = (props) => {
  const texture = useTexture(pokertable);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(50, 50);
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
    ...props,
  }));
  return (
    <Plane ref={ref} args={[1000, 1000]} receiveShadow>
      <meshStandardMaterial attach="material" color="white" map={texture} />
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
  const camHeight = 20;
  const dicePos = useStore((state) => state.dicePos);
  const cam = useRef();
  useEffect(() => {
    cam.current.lookAt(lookAt.x, lookAt.y, lookAt.z);
  }, []);
  const wrapper = useRef();

  const { camPosition } = useSpring({
    camPosition: [dicePos.x, dicePos.y + camHeight, dicePos.z],
  });

  return (
    <animated.mesh ref={wrapper} position={camPosition}>
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
      <Physics defaultContactMaterial={{ friction: 1 }}>
        <Scene />
      </Physics>
    </Canvas>
  );
};

export default ThreeCanvas;
