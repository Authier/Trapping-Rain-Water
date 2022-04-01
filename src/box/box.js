import React from "react";

import "./box.css";

export default function Box (props) {

    const ref = React.useRef(null)

    let styles = {
        width: `${props.sideBoxes}px`,
        height: `${props.sideBoxes}px`,
    }

    if (props.element === "water") {
        styles = {
            ...styles, 
            backgroundImage: "radial-gradient(#0000a3, #252587)",
            opacity: "0.5",
        };
    } else if (props.element === "land") {
        styles = {
            ...styles, 
            backgroundImage: "radial-gradient(#462c2c, #5a2f2f)",
            opacity: "1",
        };
    } else {
        styles = {
            ...styles, 
            backgroundColor: "transparent",
            opacity: "1",
        };
    }

    function handleClick () {
        props.changeBox(props.rowNumber, props.columnNumber)
    }

    return (
        <div
            className="box-main"
            ref={ref}
            style={styles}

            key={props.id}
            id={props.id}
            rownumber={props.rowNumber}
            columnnumber={props.columnNumber}
            numboxes={props.numBoxes}
            numrows={props.numRows}

            onClick={handleClick}
        />
    )
}