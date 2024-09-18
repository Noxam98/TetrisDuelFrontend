import React, {useEffect, useState} from 'react';
import {control, fallDown, moveDown, moveLeft, moveRight, turnLeft, turnRight} from "./availibleActions.js";

let step = window.innerHeight/30
let startTouchX = 0
let startTouchY = 0
let prevMovesX = 0
let currentMovesX = 0
let moveXDetected = false

let prevMovesDown = 0
let currentMovesDown = 0
let moveDownDetected = false

let droppedNow = false

let timeStartTouch = null


const controlN = (n, moveType)=>{
    for (let i = 0; i< n; i++){
        console.log(i)
        control(moveType)
    }
}

const TypeGestures = () => {




    return (
        <div style={{position:'fixed', zIndex:'1', top:'0', opacity:'.1',left:'0px', width:'100vw', height:'100vh', backgroundColor:'red'}}
        onTouchStart={(event)=>{
            startTouchX = event.touches[0].screenX
            startTouchY = event.touches[0].screenY
            prevMovesX = 0
            timeStartTouch = new Date().getTime()
            console.log(step)

            // startTouchY = event.touches[0].screenY
        }}

             onTouchMove={(event)=>{

                 {  //move horizontal
                     if (!moveXDetected && Math.abs(startTouchX - event.touches[0].screenX) > step ) {
                         moveXDetected = true
                         startTouchX = event.touches[0].screenX
                     }
                     if(moveXDetected){
                         currentMovesX = Math.floor((startTouchX - event.touches[0].screenX)/ step)
                         const nMoves =  prevMovesX - currentMovesX
                         console.log(nMoves)
                         if(nMoves > 0)
                             controlN(nMoves, moveRight)
                         if(nMoves < 0)
                             controlN(-nMoves, moveLeft)
                         prevMovesX = currentMovesX
                     }
                 }
                 {      //move vertical
                    if (!droppedNow && Math.floor((startTouchY - event.touches[0].screenY)/ step) < -2 && new Date().getTime() - timeStartTouch < 150){
                         control(fallDown)
                         console.log('Date ',new Date().getTime() - timeStartTouch)
                         startTouchY = event.touches[0].screenY
                         droppedNow = true
                        moveDownDetected = true
                     }
                     if (!droppedNow && Math.floor((startTouchY - event.touches[0].screenY)/ step) < -1){
                         currentMovesDown = Math.floor((startTouchY - event.touches[0].screenY)/ step)
                         const nMoves =  prevMovesDown - currentMovesDown

                         if(nMoves > 0) {
                             controlN(nMoves, moveDown)
                             moveDownDetected = true

                         }
                         prevMovesDown = currentMovesDown

                     }
                 }
                 console.log(moveXDetected, moveDownDetected)
             }
        }
             onTouchEnd={(e)=>{
                 if(!moveXDetected && !moveDownDetected){

                     if (e.changedTouches[0].clientX > window.innerWidth/2)
                        control(turnRight)
                     else
                        control(turnLeft)
                 }

                 moveXDetected = false
                 droppedNow = false
                 moveDownDetected = false
                 prevMovesX = 0
                 currentMovesX = 0
             }}
        >

        </div>
    );
};

export default TypeGestures;