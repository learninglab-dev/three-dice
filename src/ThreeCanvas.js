/** @jsxImportSource theme-ui */
import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { withControls, useControl } from "react-three-gui";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import { PerspectiveCamera, RoundedBox, Box, Plane } from "@react-three/drei";
import { useStore } from "./App";

const Dice = (props) => {
  const setRoll = useStore((state) => state.setRoll);
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    ...props,
  }));

  useEffect(() => {
    if (api) {
      const roll = () => {
        console.log("roll set!");
        api.applyLocalForce([0, 750, 0], [0.1, 0, 0]);
      };
      setRoll(roll);
    }
  }, [api]);
  console.log(ref.current);
  console.log(api);

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
  const cam = useRef();
  const rotationX = useControl("Rotation X", { type: "number" });
  const rotationY = useControl("Rotation Y", { type: "number" });
  const rotationZ = useControl("Rotation Z", { type: "number" });
  useEffect(() => {
    console.log(lookAt);
    console.log(cam.current.rotation);
    cam.current.lookAt(lookAt.x, lookAt.y, lookAt.z);
  }, []);
  if (cam.current) {
    console.log(cam.current.rotation);
  }

  return (
    <PerspectiveCamera makeDefault ref={cam} fov={60} position={[0, 10, 10]} />
  );
};

const ThreeCanvas = ({ roll }) => {
  const lookAt = useStore((state) => state.lookAt);
  const GUICanvas = withControls(Canvas);
  return (
    <GUICanvas shadowMap>
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
    </GUICanvas>
  );
};

export default ThreeCanvas;
