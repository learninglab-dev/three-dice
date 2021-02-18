/** @jsxImportSource theme-ui */
import React, { useState } from "react";
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
  return (
    <div
      sx={{ height: "auto", width: "auto", padding: "20px", bg: "red" }}
      onClick={roll}
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
