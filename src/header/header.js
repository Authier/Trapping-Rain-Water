import React from "react";

import './header.css';

export default function Header () {

    return (
        <div className="header-container">
            <div className="header-container-left">
                Header Left
            </div>
            <div className="header-container-middle">
                Header Middle
            </div>
            <div className="header-container-right">
                Header Right
            </div>
        </div>
    )
}