import React from "react";
import FooterSocials from "./footer-socials";
import "./footer.css";

export default function Footer () {
    return (
        <div className="footer-main">

            <div className="footer-container">
                <div className="footer-container-2">
                    
                    <div className="footer-left">
                        Jacob Authier
                    </div>
                    
                    <div className="footer-middle">
                        © 2022 All rights reserved. - Designed & Coded by Jacob Authier
                    </div>
                    
                    <div className="footer-right">
                        <FooterSocials />
                    </div>

                </div>
            </div>
        </div>
    )
}