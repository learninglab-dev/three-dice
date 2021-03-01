import create from "zustand"

//zustand is a special state hook made, I think, specifically for sharing state from inside a canvas, but can be used for sharing state across other contexts
//through set, it exposes setter functions for other values in the store
export const useStore = create(set => ({
  roll: null,
  setRoll: x => set({ roll: x }),
  dicePos: { x: 0, y: 0, z: 0 },
  setDicePos: x => set({ dicePos: x }),
}))
