# Session 1

### Installs

- react-three-fiber
- three.js
- drei
- theme-ui@next

### App Structure

Add theme-ui for basic layout properties.

```
<div id='layout'>
  <Dice />
  <Button />
</div>
```
Discussion of how to implement button. Is it an element in the scene? No- we don't want the camera to see it; it's 2d. Decide to do it as a bool. Need to have an `isRolling` variable inside the canvas. Create basic button.

### Setup the Canvas

Two components: `<ThreeCanvas />` and `<Dice />`. Dice contains the mesh and canvas is the canvas. We're using drei to create our box.

Add lights

Drei allows us to treat our box component as the mesh and give it materials, etc. as children.

Fight with shadows  
https://codeworkshop.dev/blog/2020-09-19-enable-shadows-in-react-three-fiber/
**Needs mesh standard material for shadows

Add `useFrame` for some basic rotation


# Session 2

### Install three cannon

-@react-three/cannon

Had to downgrade three because of a compatibility issue.

Wrap Dice and Ground in the Physics component. Use the useBox and usePlane hooks from cannon to construct our meshes. Use the api returned from these hooks to apply forces to the cube.


# Session 3

-npm i zustand

Setup useStore hook to pass the applyForce function to the button outside of our canvas.

Challenge: there's no obvious way to set elasticity of collisions. When the mass of the cube is huge, it falls through the ground?

Move on to adjusting the camera.

add the gui for controlling camera rotation
