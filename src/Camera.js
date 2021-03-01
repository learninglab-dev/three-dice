import { useRef, useEffect } from "react";
import { useStore } from "./Store";
import { useSpring, animated } from "@react-spring/three";
import { PerspectiveCamera } from "@react-three/drei";

const Camera = () => {
  const camHeight = 10;
  const dicePos = useStore((state) => state.dicePos);

  //the camera is not part of the physics simulation, so it gets regular refs rather than one from cannon
  const cam = useRef();

  //an animation hook to show the camera's movement as it tracks dice position
  //dicePos is updated every frame, so the camera moves every frame and we animate each of those movements
  //also note the setup of the useSpring hook. it only takes the next value as argument, so it must perform a functional update from prevState under the hood
  const { camPosition } = useSpring({
    camPosition: [dicePos.x, dicePos.y + camHeight, dicePos.z],
  });

  return (
    //here also we're using a drei component for its nice interface
    //but react-spring can't animate a component from drei so we animate the parent mesh position
    <animated.mesh position={camPosition}>
      <PerspectiveCamera
        makeDefault
        ref={cam}
        fov={60}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </animated.mesh>
  );
};

export default Camera;
