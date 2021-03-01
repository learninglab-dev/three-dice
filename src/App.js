/** @jsxImportSource theme-ui */
import { useState, useEffect } from "react"
import ThreeCanvas from "./ThreeCanvas"
import { useStore } from './Store'


//a simple button, BUT we had to use zustand (useStore) to get the roll function out of the three canvas context and here into button
const Button = () => {
  const roll = useStore(state => state.roll)
  const [color, setColor] = useState("red")

  const handleClick = () => {
    setColor("grey")
    roll()
  }

  //using a timeout here because figuring out when the dice comes to a stop, well... velocity never goes to 0 and changes every frame in cannon
  useEffect(() => {
    if (color === "grey") {
      const timeout = setTimeout(() => setColor("red"), 2000)
      return () => clearTimeout(timeout)
    }
  }, [color])

  return (
    <div
      sx={{
        height: "auto",
        width: "auto",
        padding: "2vmin",
        bg: color,
        color: "white",
        zIndex: 10,
        borderRadius: "2vmin",
        bottom: "25vh",
        position: "absolute",
        fontFamily: "sans-serif",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      ROLL THE DICE
    </div>
  )
}


export default function App() {
  return (
    <div
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Button />
      <ThreeCanvas />
    </div>
  )
}
