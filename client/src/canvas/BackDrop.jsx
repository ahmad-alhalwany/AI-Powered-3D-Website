import { easing } from 'maath'
import {useRef} from 'react'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

const BackDrop = () => {
  const shadows = useRef();
  return (
 <AccumulativeShadows
    ref={shadows}
    temporal
    frames={60}
    alphaTest={0.23}
    scale={10}
    rotation={[Math.PI/ 2, 1, 0]}
    position={[0, 0, -0.14]}
 >
  <RandomizedLight
    amount={4}
    radius={15}
    intensity={0.65}
    ambient={0.55}
    position={[5, 5, -10]}
  />
   <RandomizedLight
    amount={4}
    radius={5}
    intensity={0.25}
    ambient={0.55}
    position={[-9, 5, -3]}
  />
  
 </AccumulativeShadows>
  )
}

export default BackDrop
