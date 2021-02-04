/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import ThreeCanvas from './ThreeCanvas'

const Button = ({roll, setRoll}) => {
  return (
    <div sx={{height:'auto', width:'auto', padding:'20px', bg:'red'}} onClick={(e)=>setRoll(!roll)}>
      ROLL THE DICE
    </div>
  )
}

function App() {
  const [roll, setRoll] = useState(false)
  return (
    <div sx={{height:'100vh', width:'100vw', display:'flex', alignItems:'center',justifyContent:'center'}}>
      <Button roll={roll} setRoll={setRoll}/>
      <ThreeCanvas roll={roll}/>
    </div>
  );
}

export default App;
