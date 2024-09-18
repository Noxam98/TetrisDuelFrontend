import React, {useEffect, useRef} from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import {OrthographicCamera} from "@react-three/drei";

import game from "../gameLogic/game.js";

const Camera = (props) => {
    const ref = useRef();
    const set = useThree((state) => state.set);
    useEffect(() => void set({camera: ref.current}), []);
    return <OrthographicCamera ref={ref} {...props} />;
};

function Box({position, color}) {
    return (
        <mesh position={position}>
            <boxGeometry args={[.96, .96, 1]}/>
            {
                color === squareNumberToColor[4] ? //shadow
                    // <meshStandardMaterial color={''}/>
                    <meshStandardMaterial ou color={color}/>

                    :
                    <meshStandardMaterial color={color}/>


            }

            {/*<meshStandardMaterial color={color}/>*/}
        </mesh>
    )
}



function NextBox({position, color}) {

    return (
        <mesh position={position}>
            <boxGeometry args={[.9, .9, 1]}/>
            <meshStandardMaterial color={color} />
        </mesh>
    )
}


const squareNumberToColor = {
    0: 'rgba(0,0,0,0)',
    1: '#d0d0d0',
    2: '#77c8fa',
    3: '#930000',
    4: 'rgb(51,63,51)', //shadow color
    next: '#6477ea'
}

export default function GameField({nextTetraminos, height = 600, fieldArray = initArrTest, buffer}) {

    const ratio = 0.4793388429752066
    const screenHeight = height
    return (

        <div style={{
            position: 'relative',
            padding: '',
            width: `${Math.floor(screenHeight * ratio)}px`,
            height: `${screenHeight}px`
        }}>
            <div style={{position: 'absolute', right: '100%',}}>
                {
                    nextTetraminos &&
                    <Canvas style={{
                        border: `2px solid ${'#6477ea'}`,
                        borderRadius: '3px',

                        width: `${Math.floor(screenHeight * ratio) / 6}px`,
                        height: `${screenHeight / 4}px`,
                        backgroundColor: '#2c1010',
                    }}>

                        <Camera position={[4, 5, 100]} rotation={[0, 0, 0]} zoom={screenHeight * ratio / 20}/>
                        <ambientLight/>

                        {nextTetraminos.map((tetramino, nTetra) => tetramino.map((line, lineNumber) => {

                            return line.map((squareValue, squareNumber) => {
                                if (squareValue)
                                    return <NextBox key={`${lineNumber}${squareNumber}`}

                                                    color={squareValue ? squareNumberToColor.next : 0}
                                                    position={[3 + squareNumber, (9.5 - lineNumber) - ((nTetra * 5)), 1]}/>
                            })
                        }))}

                    </Canvas>
                }

            </div>
            {
                buffer &&
                <div style={{           //--------------------buffer
                    position: 'absolute',
                    border: `2px solid ${'#6477ea'}`,
                    borderRadius: '3px',
                    left: `0px`,

                    bottom: '15px',
                    transform: 'translate(-100%, 0)',
                    zIndex: '5',
                    height: `${screenHeight / 8}px`,
                    width: `${Math.floor(screenHeight * ratio) / 5}px`,

                }}
                     onClick={() => game.toBuffer()}
                >
                    <span style={{
                        color: 'white',
                        position: 'absolute',
                        right: '10px',
                        bottom: '-25px',
                        backgroundColor: 'rgba(100,119,234,0.41)',
                        borderRadius:'5px',
                        padding:'3px',
                        zIndex: '10'
                    }}>buffer</span>

                    {
                        nextTetraminos &&
                        <Canvas style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#2c1010',
                        }}>

                            <Camera position={[4, 5, 100]} rotation={[0, 0, 0]} zoom={screenHeight * ratio / 20}/>
                            <ambientLight/>

                            {buffer?.map((line, lineNumber) => {

                                return line.map((squareValue, squareNumber) => {
                                    if (squareValue)
                                        return <NextBox key={`${lineNumber}${squareNumber}`}

                                                        color={squareValue ? squareNumberToColor.next : 0}
                                                        position={[2.5 + squareNumber, (6.5 - lineNumber), 1]}/>
                                })
                            })}

                        </Canvas>
                    }

                </div>
            }

            {fieldArray &&
                <Canvas style={{
                border: `2px solid ${'#6477ea'}`,
                borderRadius: '3px',
                // position: 'absolute',
                backgroundColor: '#2c1010',
            }}>


                <Camera position={[4.5, 10, 100]} rotation={[0, 0, 0]} zoom={screenHeight * ratio / 10} fov={90}/>
                <ambientLight/>


                {fieldArray.map((line, lineNumber) => {
                    return line.map((squareValue, squareNumber) => {
                        if (squareValue)
                            return <Box key={`${lineNumber}${squareNumber}`}
                                        color={squareNumberToColor[squareValue]}
                                        position={[squareNumber, 20 - lineNumber, 0]}/>
                    })
                })}
            </Canvas>}
        </div>


    )
}
