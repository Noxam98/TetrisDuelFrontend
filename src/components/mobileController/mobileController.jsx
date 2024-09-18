import React, {useEffect, useState} from 'react';
import TypeButtons from "./controllerTypes/typeButtons.jsx";
import SettingsController, {typesController} from "./settingsController.jsx";
import TypeGestures from "./controllerTypes/typeGestures.jsx";
import {SVG_FULLSCREEN, SVG_NFULLSCREEN, SVG_SETTINGS} from "../../assets/joystick_images/index.js";


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


const MobileController = ({setArrowButtonHeight, arrowButtonHeight}) => {
    const [typeController, setTypeController] = useState('buttons')
    const [fullscreen, setFullscreen] = useState(undefined)
    const [settingsOpen, setSettingsOpen] = useState(false)


    useEffect(() => {
        try {
            if (fullscreen) {
                document.body.requestFullscreen();
            } else if (fullscreen === false) {
                document.exitFullscreen();
            }
        } catch {

        }
    }, [fullscreen])


    return (
        <div style={{position: 'absolute'}}>

            <div style={{                  //full_screen
                position: 'fixed',
                top: 0,
                opacity:'.4',
                right: '60px',
                zIndex:'2',
                margin: '10px'
            }}
                 onClick={() => setFullscreen(prev => !prev)}>
                <ButtonImage src={!fullscreen ? SVG_FULLSCREEN : SVG_NFULLSCREEN} style={{height: '50px'}}/>
            </div>

            <div style={{                     //settings
                position: 'fixed',
                top: '10px',
                right: '10px',
                margin: '0',
                zIndex:'2',
                opacity:'.4'
            }}
                 onClick={() => {
                     setSettingsOpen(prev => !prev)
                     console.log(settingsOpen)
                 }}>
                <ButtonImage src={SVG_SETTINGS} style={{height: '50px'}}/>
            </div>

            {
                settingsOpen &&
                <SettingsController setTypeController={setTypeController} typeController={typeController}
                                    setArrowButtonHeight={setArrowButtonHeight} setSettingsOpen={setSettingsOpen}/>
            }

            {
                typeController === typesController[1] &&
                    <TypeButtons arrowButtonHeight={arrowButtonHeight}/>
            }
            {
                typeController === typesController[0] &&
                    <TypeGestures arrowButtonHeight={arrowButtonHeight}/>
            }
        </div>
    );
};

export default MobileController;