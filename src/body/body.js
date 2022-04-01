import React, { useEffect } from 'react';

import Box from '../box/box';

import './body.css';

import { nanoid } from 'nanoid';

export default function Body () {
    
    const [detectChange, setDetectChange] = React.useState(0)
    const [boxMain, setBoxMain] = React.useState(null)

    const [displayRows, setDisplayRows] = React.useState(null)

    const [gridColumns, setGridColumns] = React.useState(0)
    const [doClearWater, setDoClearWater] = React.useState(false)
    const [isFlooded, setIsFlooded] = React.useState(false)
    const [blocksFlooded, setBlocksFlooded] = React.useState(0)
    

    const ref = React.useRef(null)

    function changeBox (rowNum, colNum) {
        if (isFlooded) {
            ClearWater()
        }

        let lookAtRow = rowNum;
        let lookAtCol = colNum;
        if (boxMain[lookAtRow][lookAtCol].element === "air") {
            for (let i = boxMain.length - 1; i >= 0; i--) {
                const element = boxMain[i][lookAtCol].element
                if (element === "air" || element === "water") {
                    lookAtRow = i;
                    break
                }
            }
        } else {
            for (let i = 0; i < boxMain.length; i++) {
                const element = boxMain[i][lookAtCol].element
                if (element !== "air" && element !== "water") {
                    lookAtRow = i;
                    break
                }
            }
        }
        
        setBoxMain(prevBoxMain => {
            let oldBoxMain = prevBoxMain;
            let oldElement = oldBoxMain[lookAtRow][lookAtCol].element;
            
            let newElement = "land";
            if (oldElement === "land") {
                newElement = "air"
            }

            oldBoxMain[lookAtRow][lookAtCol].element = newElement;
            return oldBoxMain
        })

        setDetectChange(prev => prev + 1)
    }
    
    React.useEffect(() => {
        Clear();
    }, [])
    
    React.useEffect(() => {
        if (boxMain) {
            const rows = boxMain[0][0].numRows
            const columns = boxMain[0][0].numBoxes
            
            const grid = []
            
            for (let i = 0; i < rows; i++) {
                const appendRow = []
                for (let j = 0; j < columns; j++) {
                    appendRow.push(
                        <Box 
                            key={boxMain[i][j].id}
                            id={boxMain[i][j].id}
                            rowNumber={boxMain[i][j].rowNumber}
                            columnNumber={boxMain[i][j].columnNumber}
                            numBoxes={boxMain[i][j].numBoxes}
                            numRows={boxMain[i][j].numRows}
                            sideBoxes={boxMain[i][j].sideBoxes}
                            element={boxMain[i][j].element}
                            changeBox={changeBox}
                        />
                    )
                }
                grid.push(appendRow)
                
            }
            setDisplayRows(grid)
        }
    }, [boxMain, detectChange])
    
    function Clear () {
        /* Describes array with all information */
        const sideBoxes = 40; 
        
        const heightContainer = ref.current.offsetHeight;
        const widthContainer = ref.current.offsetWidth;

        const numRows = Math.floor(heightContainer / sideBoxes)
        const numBoxes = Math.floor(widthContainer / sideBoxes) - 2
        // console.log(widthContainer, widthContainer / sideBoxes, numBoxes)
        setGridColumns(numBoxes)
        /* Beginning of array birth */
        
        const main = []
        for (let i = 0; i < numRows; i++) {
            const rows = []
            for (let j = 0; j < numBoxes; j++) {
                const id = nanoid();
                rows.push(
                    {
                        id: id,
                        rowNumber: i,
                        columnNumber: j,
                        numRows: numRows,
                        numBoxes: numBoxes,
                        sideBoxes: sideBoxes,
                        element: "air",
                    }
                )
            }
            main.push(rows) 
        }

        setIsFlooded(false)
        setBoxMain(main) 

        /* End of array birth */
    }

    function ClearWater () {
        setBoxMain(prevBoxMain => {
            const oldBoxMain = prevBoxMain;
            const rowLength = oldBoxMain.length;
            const colLength = oldBoxMain[0].length;

            for (let col = 0; col < colLength; col++) {
               for (let row = rowLength - 1; row >= 0; row--) {
                   if (oldBoxMain[row][col].element === "water") {
                        oldBoxMain[row][col].element = "air";
                   }
               }
            }
            return oldBoxMain;
        });
        setIsFlooded(false)
        setDoClearWater(false)
        setDetectChange(prev => prev + 1)
    }

    function Flood () {
        let FromLeftMaxArray = [];
        let FromRightMaxArray = [];
        let Water = [];

        let maxLeft = 0;
        let maxRight = 0;

        const LandTo2DArray = [];
        for (let column = 0; column < boxMain[0].length; column++) {
            let bottom = boxMain.length - 1;
            let height = 0;
            
            while (bottom >= 0 && boxMain[bottom][column].element === "land") {
                height++;
                bottom--;
            }
            LandTo2DArray.push(height);
        }
        
        for (let i = 0; i < LandTo2DArray.length; i++) {
            maxLeft = Math.max(maxLeft, LandTo2DArray[i]);
            FromLeftMaxArray.push(maxLeft);
        }

        for (let i = LandTo2DArray.length - 1; i >= 0; i--) {
            maxRight = Math.max(maxRight, LandTo2DArray[i]);
            FromRightMaxArray.unshift(maxRight);
        }
        
        for (let i = 0; i < LandTo2DArray.length; i++) {
            Water.push(Math.min(FromLeftMaxArray[i], FromRightMaxArray[i]) - LandTo2DArray[i])
        }

        setBoxMain(prevBoxMain => {
            const oldBoxMain = prevBoxMain;
            const rowLength = oldBoxMain.length;
            const colLength = oldBoxMain[0].length;

            for (let col = 0; col < colLength; col++) {
                let fillUp = Water[col]
                let bottom = rowLength - 1;
                while (fillUp > 0) {
                    if (oldBoxMain[bottom][col].element !== "land") {
                        oldBoxMain[bottom][col].element = "water";
                        fillUp--;
                    }
                    bottom--;
                }
            }
            return oldBoxMain;
        });


        setBlocksFlooded(Water.reduce(function (a, b) {return a + b; }, 0))
        setIsFlooded(true)
        setDoClearWater(true)
        setDetectChange(prev => prev + 1)
    }

    function RandomNumber (min, max) {
        return Math.floor(Math.pow(Math.random() * max^2, 0.90)) - min;
        // return Math.floor(Math.random() * (max - min) + min)
    }

    function Random () {
        Clear();
        

        // This will create a random array of numbers (which will be the heights of the lands at hand)
        setBoxMain(prevBoxMain => {
            let oldBoxMain = prevBoxMain;
            const rowLength = oldBoxMain.length;
            const colLength = oldBoxMain[0].length;
            
            for (let i = 0; i < colLength; i++) {
                const ranNum = RandomNumber(0, rowLength)
                for (let j = rowLength - 1; j > ranNum; j--) {
                    oldBoxMain[j][i].element = "land";
                }
            }

            return oldBoxMain;
        })
        
        setDetectChange(prev => prev + 1)
    }
    
    return (
        <div>
            <div className='body'>
                <div 
                    ref={ref} 
                    className='body-boxes' 
                    style={{gridTemplateColumns:`repeat(${gridColumns}, 1fr)`}}
                >
                    {displayRows}
                </div>
            </div>
            <div className='body-flood'>
                {
                    doClearWater ? 
                    <button id='body-button' onClick={ClearWater}>Clear Water</button>
                    :
                    <button id='body-button' onClick={Clear}>Clear</button>
                }       
                <button id='body-button' onClick={Flood}>FLOOD!</button>
                <button id='body-button' onClick={Random}>Random</button>
            </div>
            <div className='body-number-flooded-container'>
                {
                    isFlooded ? 
                    <>
                        <h1 id='blocks-flooded'>
                            Blocks Flooded: {blocksFlooded}
                        </h1>
                    </>
                    :
                    <>
                    </>
                }
            </div>
        </div>
    )
}