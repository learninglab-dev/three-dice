import * as THREE from "three"
import {
  Plane,
  useTexture,
} from "@react-three/drei"
import { usePlane } from "@react-three/cannon"
import pokertable from "./textures/pokertable.jpeg"


const Ground = () => {
  //a helper hook for using THREE.texture in react
  const texture = useTexture(pokertable)
  //repeat rather than stretch
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(50, 50)

  //create a plane in the physics rig (cannon) and assign initial properties
  //get a reference to that plane to pass to our THREE mesh
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
  }))

  return (
    //drei's Plane component is a shortcut for plane buffer geometry that has a nice prop interface
    //args here are dimensions and we pass the ref from cannon
    //then attach a material and our image texture
    <Plane ref={ref} args={[1000, 1000]} receiveShadow>
      <meshStandardMaterial attach="material" color="white" map={texture}/>
    </Plane>
  )
}

export default Ground
