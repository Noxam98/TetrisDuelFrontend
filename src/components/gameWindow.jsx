import React, {useEffect, useRef, useState} from 'react';
import GameField from "./gameField";
import {Canvas, useFrame} from "@react-three/fiber";
import game from "../gameLogic/game.js";
import keydownListener from "../gameLogic/events/keyboard.js";
import TypeButtons from "./mobileController/controllerTypes/typeButtons.jsx";
import {MobileView, BrowserView} from 'react-device-detect';
import useScreenOrientation from 'react-hook-screen-orientation'
import useWebSocket from "react-use-websocket";
import MobileController from "./mobileController/mobileController.jsx";

const GameCycleMesh = ({
                           timeLastTick, timeLastUpdateField, setTimeLastUpdateField, setTimeLastTick, gameTickInterval
                       }) => {
    const gameCycleRef = useRef();
    useFrame(() => {
        try {
            window.Telegram?.WebApp?.expand()

        } catch {
        }

        if (gameCycleRef.current) {
            if (new Date().getTime() - timeLastTick >= gameTickInterval) {
                setTimeLastTick(new Date().getTime())
            }
        }
        if (game.timeLastUpdateField !== timeLastUpdateField) setTimeLastUpdateField(game.timeLastUpdateField)
    })
    return (<mesh ref={gameCycleRef}/>

    );
}


const GameWindow = ({sendMessage, win, opponentGameField}) => {

    const [gameTickInterval, setGameTickInterval] = useState(game.gameData.tickInterval)
    const [gameStarted, setGameStarted] = useState(true)
    const [timeLastTick, setTimeLastTick] = useState(new Date().getTime())
    const [timeLastUpdateField, setTimeLastUpdateField] = useState(undefined)
    const [gameField, setGameField] = useState(game.getGameFieldWithTetramino())
    const [nextTetraminos, setNextTetraminos] = useState(game.tetramino.getNextTetraminos())
    const screenOrientation = useScreenOrientation()
    const [arrowButtonHeight, setArrowButtonHeight] = useState(110)

    const gameFieldHeight = window.innerHeight - (arrowButtonHeight * 2 + 10)
    const mainField = useRef()
    useEffect(() => {
        if (gameStarted) {

            document.addEventListener('keydown', keydownListener)

        }

        return () => document.removeEventListener('keydown', keydownListener)

    }, [gameStarted])

    useEffect(() => {
        if (gameStarted) game.moveDown()
    }, [timeLastTick])

    useEffect(() => {
        setGameField(game.getGameFieldWithTetramino())
        setGameTickInterval(game.gameData.tickInterval)
        setNextTetraminos(game.tetramino.getNextTetraminos())
        try {
            sendMessage(JSON.stringify({field: game.getGameFieldWithTetramino()}))
            if (game.gameData.linesToOpponent > 0) {
                sendMessage(JSON.stringify({linesToOpponent: game.gameData.linesToOpponent}))
                game.gameData.linesToOpponent = 0
            }
            if (game.gameData.gameOver) {
                sendMessage(JSON.stringify({win: false}))
            }
        } catch {
            console.log('ws on GameWindow send error')
        }
    }, [timeLastUpdateField])


    useEffect(() => {
        if (win) {
            setGameStarted(false)
            console.log(useWebSocket)
        }
    }, [win])

    return (<div style={{height: '1px', position: "relative", width: '100%'}}>

        <Canvas>
            <GameCycleMesh gameTickInterval={gameTickInterval}
                           setTimeLastUpdateField={setTimeLastUpdateField}
                           timeLastUpdateField={timeLastUpdateField}
                           setTimeLastTick={setTimeLastTick}
                           timeLastTick={timeLastTick}/>
        </Canvas>
        <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
            <div ref={mainField} style={{display: "flex"}}>
                <div>
                    {opponentGameField &&
                        <>

                            <BrowserView>
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    backgroundColor: '#6477ea',
                                    padding: '5px',
                                    borderRadius: '5px',
                                    left: '10px',
                                    zIndex: '1'
                                }}>
                                    <span style={{color: 'white', display: 'block'}}> rotate:  Z, X;</span>
                                    <span style={{color: 'white', display: 'block'}}> moves: arrows (down, left, right);</span>
                                    <span style={{color: 'white', display: 'block'}}> drop down tetramino: Space;</span>
                                    <span style={{color: 'white', display: 'block'}}> use buffer: Shift.</span>

                                </div>
                                <div style={{display: 'flex'}}>

                                    <div style={{marginTop: `${gameFieldHeight / 3}px`, marginRight: `5px`}}>
                                        <GameField
                                            height={gameFieldHeight / 2 < ((window.innerWidth - (gameFieldHeight / 2)) * 2 + 17) ? gameFieldHeight / 2 : ((window.innerWidth - (gameFieldHeight / 2)) * 2 + 17)}
                                            fieldArray={opponentGameField}
                                        />
                                        <span style={{
                                            color: 'white',
                                            backgroundColor: 'rgba(100,119,234,0.67)',
                                            padding: '3px',
                                            borderRadius: '3px'
                                        }}>opponent</span>
                                    </div>
                                    <div style={{position: 'relative'}}>
                                        <div style={{
                                            position: "absolute",
                                            margin: '10px',
                                            zIndex: '1',
                                            color: 'white',
                                            display: 'flex',
                                            flexDirection: "column"
                                        }}>
                                            <span>score: {game.gameData.score}</span>
                                            <span>speed: {(1010 - game.gameData.tickInterval) / 10}</span>


                                        </div>
                                        <GameField height={gameFieldHeight}
                                                   fieldArray={gameField} buffer={game.gameData.buffer.tetra}
                                                   nextTetraminos={nextTetraminos}/>

                                    </div>
                                </div>
                            </BrowserView>
                            <MobileView>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginTop: `${gameFieldHeight / 3}px`, marginRight: `5px`}}>
                                        <div>
                                            <GameField
                                                height={gameFieldHeight / 2 < ((window.innerWidth - (gameFieldHeight / 2)) * 2 + 17) ? gameFieldHeight / 2 : ((window.innerWidth - (gameFieldHeight / 2)) * 2 + 17)}
                                                fieldArray={opponentGameField}
                                            />
                                            <span style={{color: 'white', backgroundColor: '#6477ea'}}>opponent</span>
                                        </div>
                                    </div>
                                    <div style={{position: 'relative'}}>
                                        <div style={{
                                            position: "absolute",
                                            margin: '10px',
                                            zIndex: '1',
                                            color: 'white',
                                            display: 'flex',
                                            flexDirection: "column"
                                        }}>
                                            <span>score: {game.gameData.score}</span>
                                            <span>speed: {(1010 - game.gameData.tickInterval) / 10}</span>


                                        </div>
                                        <GameField height={gameFieldHeight - arrowButtonHeight / 4}
                                                   fieldArray={gameField} buffer={game.gameData.buffer.tetra}
                                                   nextTetraminos={nextTetraminos}/>
                                    </div>
                                </div>

                                <MobileController setArrowButtonHeight={setArrowButtonHeight} screenOrientation={screenOrientation} arrowButtonHeight={arrowButtonHeight}/>

                            </MobileView>
                        </>
                    }
                </div>
            </div>
        </div>


    </div>);
};

export default GameWindow;