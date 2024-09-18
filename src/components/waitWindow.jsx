import React, {useEffect, useState} from 'react';
import game from "../gameLogic/game.js";

const WaitWindow = ({readyState, opponentFinded, setReload}) => {
    const [waitTime, setWaitTime] = useState(0)
    const [waitTimeIntervalID, setWaitTimeIntervalID] = useState(undefined)
    useEffect(() => {
        console.log(readyState)
            if (!waitTimeIntervalID )
                if(readyState === 1)
                    setWaitTimeIntervalID(
                    setInterval(() => {
                        setWaitTime((prevState) => prevState += 1)
                    }, 1000))

        if(readyState !== 1)
            clearInterval(waitTimeIntervalID)

        return () => {
            clearInterval(waitTimeIntervalID)
        }
    }, [readyState])

    const tryAgain = () => {
        game.initGame()
        setReload((prev) => prev+=1)
    }

    return (
        <div style={{
            backgroundColor: "#274248",
            position: 'absolute',
            top:'0',
            height: '100vh',
            width: '100vw',
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            flexDirection: 'column'
        }}>
            <span style={{
                position: "absolute",
                fontSize: '200pt',
                top: '0px',
                textAlign: 'center',
                color: 'rgba(42,76,94,0.5)'
            }}>{waitTime}</span>

            {
                readyState === 0 &&
                <span color={'#0d3cbd'} style={{fontSize: '23pt',}}>  Connecting...</span>
            }
            {
                readyState === 1 &&
                <span color={'#0d3cbd'} style={{fontSize: '23pt',}}>  Connected to server.</span>

            }
            {
                readyState === 3 &&
                <>
                    <span color={'#0d3cbd'} style={{fontSize: '14pt',}}>  Error connecting to server.</span>
                    <span color={'#0d3cbd'} style={{fontSize: '14pt',}}>  Check you internet connection</span>
                    <span color={'#0d3cbd'} style={{fontSize: '14pt',}}>  and try again.</span>
                    <button style={{padding: '20px', width: '200px', margin: '40px 10px 10px 10px', fontSize: '12pt'}}
                            onClick={tryAgain}
                    >
                        Try Again
                    </button>
                </>

            }


            { readyState === 1&&
                <>
                    {
                        opponentFinded === false ?
                            <span color={'#0d3cbd'} style={{fontSize: '20pt'}}> Waiting for opponent..</span>
                            :
                            <span color={'#0d3cbd'} style={{fontSize: '23pt'}}> starting game...{opponentFinded}</span>

                    }
                </>
            }

        </div>
    );
};

export default WaitWindow;