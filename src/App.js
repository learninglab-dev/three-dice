/** @jsxImportSource theme-ui */
import React, { useState, useEffect } from "react";
import ThreeCanvas from "./ThreeCanvas";
import create from "zustand";

export const useStore = create((set) => ({
  roll: null,
  setRoll: (x) => set({ roll: x }),
  lookAt: { x: 0, y: 0, z: 0 },
  setLookAt: (x) => set({ lookAt: x }),
  dicePos: { x: 0, y: 0, z: 0 },
  setDicePos: (x) => set({ dicePos: x }),
}));

const Button = () => {
  const roll = useStore((state) => state.roll);
  console.log(roll);
  const [color, setColor] = useState("red");
  const handleClick = () => {
    setColor("grey");
    roll();
  };
  useEffect(() => {
    console.log(color);
    if (color === "grey") {
      const timeout = setTimeout(() => setColor("red"), 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [color]);
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
  );
};

function App() {
  const [roll, setRoll] = useState(false);
  return (
    <div
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button />
      <ThreeCanvas roll={roll} />
    </div>
  );
}

export default App;
