import {useEffect, useState} from "react";

import GameWindow from "./components/gameWindow.jsx";
import {initGameArray} from "./gameLogic/initField.js";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import game from "./gameLogic/game.js";

import ScoreWindow from "./components/scoreWindow.jsx";
import WaitWindow from "./components/waitWindow.jsx";

const getRandomID = () => {
    return Array(10).fill('')
        .map(() => String(Math.floor(Math.random() * 10)))
        .join('')
}
const userID = getRandomID()

const App = () => {

    const [opponentField, setOpponentField] = useState(initGameArray())
    const [opponentFinded, setOpponentFinded] = useState(false)
    const [addLineCount, setAddLineCount] = useState(initGameArray())
    const [win, setWin] = useState(undefined)
    const [reload, setReload] = useState(0)
    let {sendMessage, lastMessage, readyState} = useWebSocket(`wss://meliqq.space/tetris/api/${userID}`);

    useEffect(() => {
        if (win === null) {
            if (opponentFinded)
                setOpponentFinded(false)


        }
    }, [win])

    useEffect(() => {
        if (lastMessage !== null) {
            const data = JSON.parse(lastMessage.data)
            if (data['field']) {
                if (!opponentFinded)
                    setOpponentFinded(true)
                setOpponentField(data['field']);
            }

            if (data['win']) {
                console.log(data['win'])
                setWin(data.win)

            }
            if (data['lineCount'])
                game.addLines(data['lineCount'])


        }
    }, [lastMessage]);


    return (
        <div style={{backgroundColor: '', position: 'relative', marginTop: "", width: '100vw', padding: "0"}}>
            {
                (win === 'winner' | win === 'looser') ?
                    <ScoreWindow setReload={setReload} setWin={setWin} win={win === 'winner'}/>
                    :
                    <div key={reload} style={{width: '100%'}}>

                        {
                            opponentFinded ?

                                <GameWindow win={win} sendMessage={sendMessage} opponentGameField={opponentField}/>
                                :
                                // <GameWindow setAddLineCount={setAddLineCount} win={win} addLineCount={addLineCount}
                                //             sendMessage={sendMessage} opponentGameField={opponentField}/>
                                <WaitWindow readyState={readyState} setReload={setReload} opponentFinded={opponentFinded}/>
                        }
                    </div>
            }

        </div>
    )
}

export default App