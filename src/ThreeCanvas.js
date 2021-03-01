/** @jsxImportSource theme-ui */
import { Canvas } from "react-three-fiber"
import { Physics } from "@react-three/cannon"
import Ground from './Ground'
import Camera from './Camera'
import Dice from './Dice'


//bundling the objects in our scene in a component
const Scene = () => {
  return (
    <>
      <Dice castShadow receiveShadow />
      <Ground />
    </>
  )
}


//setup the canvas
//all components wrapped in Canvas are rendered with react-three-fiber rather than react-DOM
//only components wrapped in Physics are part of the physics simulation
const ThreeCanvas = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1}/>
      <directionalLight
        intensity={0.5}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}/>
      <Camera/>
      <Physics
        defaultContactMaterial={{
          friction: 10,
        }}>
        <Scene/>
      </Physics>
    </Canvas>
  )
}

export default ThreeCanvas
