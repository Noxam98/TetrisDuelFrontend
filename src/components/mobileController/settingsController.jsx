import React, {useEffect} from 'react';

export const typesController = ['gestures', 'buttons']

const TypeControllerView = ({typeController, setTypeController, setArrowButtonHeight}) => {

    const changeTypeController = () => {
        setTypeController(prevType => {
            let indexType = typesController.indexOf(prevType)
            indexType += 1
            if (indexType > typesController.length - 1)
                indexType = 0
            return typesController[indexType]
        })
    }

    useEffect(() => {
        if (!typeController) {
            setTypeController(typesController[1])
        }

        if (typeController === typesController[0]) {
            setArrowButtonHeight(80)
            console.log(0)
        }
        if (typeController === typesController[1]) {
            setArrowButtonHeight(100)
            console.log(0)
        }

        console.log('current type control is', typeController)
    }, [typeController])

    return (
        <fieldset style={{borderRadius:'10px'}}>
            <legend style={{fontSize:'12pt'}}>Select control type</legend>
            {typesController.map(type => {

                return <button style={{backgroundColor: 'gray', borderRadius:'10px'}}
                onClick={()=>setTypeController(type)}
                >{type === typeController? `>>${type}<<`:type}</button>
            })}
        </fieldset>
    )

}

const SettingsController =
    ({
         typeController, setTypeController,
         setArrowButtonHeight, setSettingsOpen
     }) => {


        return (
            <div style={{
                position: 'fixed',
                top: '0px',
                zIndex:'2',
                width: 'calc(100% - 50px)',
                height: '50%',
                left: '10px',
                padding: '10px',
                transform: 'translate(5px, 20%)',
                borderRadius: '20px',
                border:'2px solid gray',
                backgroundColor: '#343a64'
            }}>
                <span style={{
                    color: 'white',
                    display: 'block',
                    textAlign: "center",
                    width: 'calc(100% + 10px)',
                    margin:'-10px 0 0 -10px',
                    backgroundColor: 'gray',
                    borderRadius: '10px 10px 0 0 ',
                    fontSize: '20pt',
                    padding: '5px'
                }}> Settings </span>
                <span style={{
                    color: 'white',
                    display: 'block',
                    position:'absolute',
                    top:'-10px',
                    textAlign: "center",
                    width: 'min-content',
                    margin:'0',
                    right:'0',
                    transform:'translate(0, -25%)',
                    rotate:'45deg',
                    backgroundColor: '#930202',
                    borderRadius: '50%',
                    fontSize: '30pt',
                    padding: '0px 10px'
                }}
                      onClick={()=>setSettingsOpen(false)}
                > + </span>

                <div style={{position: 'relative', width: '100%', backgroundColor: '', height: '100%'}}>
                    <TypeControllerView typeController={typeController} setTypeController={setTypeController}
                                        setArrowButtonHeight={setArrowButtonHeight}/>

                </div>
            </div>
        );
    };

export default SettingsController;