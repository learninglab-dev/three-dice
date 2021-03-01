import { useEffect } from 'react'
import { useBox } from "@react-three/cannon"
import {
  Box,
  useTexture,
} from "@react-three/drei"
import { useStore } from "./Store"
import faceOne from "./textures/diceFaces/one.png"
import faceTwo from "./textures/diceFaces/two.png"
import faceThree from "./textures/diceFaces/three.png"
import faceFour from "./textures/diceFaces/four.png"
import faceFive from "./textures/diceFaces/five.png"
import faceSix from "./textures/diceFaces/six.png"


const getRandFloat = (low, high) => {
  const result = Math.random() * (high - low) + low
  return result
}

const getSign = (float) => {
  const result = Math.random() < 0.5 ? -1 : 1;
  return result * float
}


const Dice = () => {
  //use the texture helper hook to covert all of our jpegs to textures
  //a cube has a special geometry that allows us to give it 6 materials and it will automatically apply one to each face; this does not work for any extruded geometry, e.g. the nice cube with rounded corners
  const texture1 = useTexture(faceOne)
  const texture2 = useTexture(faceTwo)
  const texture3 = useTexture(faceThree)
  const texture4 = useTexture(faceFour)
  const texture5 = useTexture(faceFive)
  const texture6 = useTexture(faceSix)

  //get the setter functions for our state from zustand
  const setRoll = useStore(state => state.setRoll)
  const setDicePos = useStore(state => state.setDicePos)

  //like Ground, create an object, the cube, in the physics rig and get a ref to that object
  //cannon also returns a second element, api, that allows you to trigger methods on the objects in the physics which we didn't need for Ground but do for Dice
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
  }))

  useEffect(() => {
    //function to update our dice and camera positions
    //is the callback to our subcription to the api we got from cannon
    const updatePosAndCamera = p => {
      const pX = parseFloat(p[0].toFixed(1))
      const pY = parseFloat(p[1].toFixed(1))
      const pZ = parseFloat(p[2].toFixed(1))
      setDicePos({
        x: pX,
        y: pY,
        z: pZ,
      })
    }
    //once the physics object exists...
    if (api) {
      //the function to roll the dice
      const roll = () => {
        api.applyImpulse(
          [getRandFloat(-5, 5), getRandFloat(10, 20), getRandFloat(-5, 5)],
          [getRandFloat(-0.1, 0.1), 0, getRandFloat(-0.1, 0.1)]
        )
      }
      //use our setter to push this function to the Store where Button can access it
      setRoll(roll)
      //subcribe to the cube position in the physics simulation and attach callback
      api.position.subscribe(p => updatePosAndCamera(p))
    }
  }, [api, setDicePos, setRoll])


  return (
    <Box ref={ref} args={[1, 1, 1]} radius={0.05}>
      <meshStandardMaterial attachArray="material" map={texture1} />
      <meshStandardMaterial attachArray="material" map={texture2} />
      <meshStandardMaterial attachArray="material" map={texture3} />
      <meshStandardMaterial attachArray="material" map={texture4} />
      <meshStandardMaterial attachArray="material" map={texture5} />
      <meshStandardMaterial attachArray="material" map={texture6} />
    </Box>
  )
}

export default Dice



//left this here in case we want to talk about our misadventure in trying to determine when the dice comes to a(n apparent) stop

// const velocity = useRef(null);
// const position = useRef(null);
// const cameraNeedsUpdate = useRef(true);

// const updateCamera = () => {
//   if (cameraNeedsUpdate.current === true) {
//     setDicePos({
//       x: position.current[0],
//       y: position.current[1],
//       z: position.current[2],
//     });
//     console.log("moved camera");
//     console.log(position.current);
//   }
// };

// const handleVelocityChange = (v) => {
//   // velocity.current = v;
//   // if (
//   //   Math.abs(velocity.current[0]) < 0.15 &&
//   //   Math.abs(velocity.current[1]) < 0.15 &&
//   //   Math.abs(velocity.current[2]) < 0.15
//   // ) {
//   //   updateCamera();
//   //   cameraNeedsUpdate.current = false;
//   // }
//   console.log(v);
// };
