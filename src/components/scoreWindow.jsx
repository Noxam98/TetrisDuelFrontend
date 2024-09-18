import React from 'react';
import game from "../gameLogic/game.js";


const ScoreWindow = ({win, setWin, setReload}) => {

    const playAgain = () => {
        game.initGame()
        setReload((prev) => prev+=1)
        setWin(null)

    }

    return (
        <div style={{position: 'absolute', zIndex: '100', height: '100%', width: '100vw'}}>
            <div style={{
                backgroundColor: `${win ? 'rgba(47,72,39,0.9)' : 'rgba(70,4,4,0.74)'}`,
                position: 'relative',
                height: '100vh',
                color: 'white',
                width: '100vw',
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                flexDirection: 'column'
            }}>


                <span color={'#ffffff'} style={{fontSize: '23pt',}}>{win ? 'You win! :)' : 'Ooops, You lose :('}</span>

                <span color={'#ffffff'} style={{fontSize: '23pt',}}> Your score: {game.gameData.score}</span>

                <button style={{padding: '20px', width: '200px', margin: '40px 10px 10px 10px', fontSize: '12pt'}}
                        onClick={playAgain}
                >
                    Play Again
                </button>


            </div>
        </div>
    );
};

export default ScoreWindow;