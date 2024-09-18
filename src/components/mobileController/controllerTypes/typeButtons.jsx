import React, {useEffect, useState} from 'react';
import {control, fallDown, moveDown, moveLeft, moveRight, turnLeft, turnRight} from "./availibleActions.js";
import {SVG_DDOWN, SVG_DOWN, SVG_MOVE, SVG_TURN} from "../../../assets/joystick_images/index.js";

const ButtonImage = ({style, src}) => {
    const [opacity, setOpacity] = useState(.1)
    return (
        <div style={{position: 'relative'}}>

            <img src={src} style={style}></img>
            <div
                onTouchStart={() => setOpacity('.7')}
                onTouchEnd={() => setOpacity('.1')}
                style={{
                    top: '0',
                    position: 'absolute',
                    backgroundColor: '#b0d4ea',
                    opacity,
                    width: '100%',
                    height: '100%'
                }}></div>
        </div>
    )

}

let intervalsID = {}
const TypeButtons = ({arrowButtonHeight}) => {
    const [swipedFellDownNow, setSwipedFeelDownNow] = useState(false)

    const dispatch = (actionType, moveType, dependencyToDisable) => {
        console.log(actionType, moveType, dependencyToDisable)
        if (actionType === 'add') {
            control(moveType)

            if (!Object.keys(intervalsID).includes(moveType)) {
                const interval = setInterval(() => {
                    control(moveType)
                }, moveType === fallDown ? 1000 : 200)
                intervalsID[moveType] = interval
            }

            if (dependencyToDisable) {
                if (Object.keys(intervalsID).includes(dependencyToDisable)) {
                    clearInterval(intervalsID[dependencyToDisable])
                    delete intervalsID[dependencyToDisable]
                }
            }

        } else {
            if (Object.keys(intervalsID).includes(moveType)) {
                clearInterval(intervalsID[moveType])
                delete intervalsID[moveType]
            }
        }
        // console.log(intervalsID)
    }

    useEffect(()=>{
        return ()=>{
            Object.entries(intervalsID).map((key, value)=>{
                clearInterval(value)
            })
        }
    },[])

    return (
        <>


            <div style={{  //Move_LEFT
                position: 'fixed',
                backgroundColor: 'rgb(65,65,183)',
                top: `calc(100vh - ${arrowButtonHeight}px)`,
                width: 'max-content',
                backgroundImage: `url(${arrowButtonHeight})`,
                height: `${arrowButtonHeight}px`,
            }}
                 onTouchStart={() => dispatch('add', moveLeft, moveRight)}
                 onTouchEnd={() => dispatch('end', moveLeft)}
            >
                <ButtonImage src={SVG_MOVE} style={{height: `${arrowButtonHeight}px`}}/>

            </div>

            <div style={{  //Move_RIGHT
                position: 'fixed',
                backgroundColor: 'rgb(65,65,183)',
                top: `calc(100vh - ${arrowButtonHeight}px)`,
                right: '0',
                width: 'max-content',
                height: `${arrowButtonHeight}px`,
            }}

                 onTouchStart={() => dispatch('add', moveRight, moveLeft)}
                 onTouchEnd={() => dispatch('end', moveRight)}

            >


                <ButtonImage src={SVG_MOVE} style={{height: `${arrowButtonHeight}px`, rotate: '180deg'}}/>


            </div>

                screenOrientation === 'portrait-primary' ?
                    <>
                        <div style={{ //move_down
                            position: 'fixed',
                            backgroundColor: 'rgb(65,65,183)',
                            borderRadius: '10px',
                            padding: '5px',
                            top: `calc(100vh - ${arrowButtonHeight * 2}px)`,
                            left: '50%',
                            transform: 'translate(-50%, 0)',

                            // width: '20vw',
                            height: `${arrowButtonHeight*2}px`
                        }}
                             onTouchStart={() => dispatch('add', moveDown)}
                             onTouchMove={(e) => {
                                 console.log(e)
                                 if (!intervalsID[fallDown])
                                     if (e.touches[0].screenY > 500) {
                                         dispatch('add', fallDown, moveDown)
                                         setSwipedFeelDownNow(true)
                                     }

                                 if (e.touches[0].screenY < 500) {
                                     // dispatch('end', fallDown)
                                     setSwipedFeelDownNow(false)
                                 }
                             }

                             }
                             onTouchEnd={() => {
                                 dispatch('end', moveDown)
                                 dispatch('end', fallDown)
                                 setSwipedFeelDownNow(false)

                             }}
                        >
                            <div style={{position:'relative', height:'100%'}}>
                                <ButtonImage src={swipedFellDownNow? SVG_DDOWN: SVG_DOWN} style={{paddingTop:`${swipedFellDownNow? 100 : 0}px`,height: `${arrowButtonHeight - 20}px`}}/>

                            </div>

                        </div>

                    </>


            <div id={moveLeft} //turn_left
                 style={{
                     position: 'fixed',
                     backgroundColor: 'rgb(65,65,183)',
                     borderTopRightRadius: '10px',
                     top: `calc(100vh - ${arrowButtonHeight * 2 + 3}px)`,
                     // width: '110px',
                     height: `${arrowButtonHeight}px`,
                 }}
                 onTouchStart={() => dispatch('add', turnLeft, turnRight)}
                 onTouchEnd={() => dispatch('end', turnLeft)}
            >
                <ButtonImage src={SVG_TURN} style={{rotate: '180deg', height: `${arrowButtonHeight}px`}}/>

            </div>
            <div id={moveLeft} //turn_right
                 style={{
                     position: 'fixed',
                     backgroundColor: 'rgb(65,65,183)',
                     borderTopLeftRadius: '10px',
                     top: `calc(100vh - ${arrowButtonHeight * 2 + 3}px)`,
                     right: '0',
                     height: `${arrowButtonHeight}px`,
                 }}
                 onTouchStart={() => dispatch('add', turnRight, turnLeft)}
                 onTouchEnd={() => dispatch('end', turnRight)}
            >
                <ButtonImage src={SVG_TURN} style={{transform: 'scale(1, -1)', height: `${arrowButtonHeight}px`}}/>

            </div>


        </>


    );
};

export default TypeButtons;