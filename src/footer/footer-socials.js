import React from "react";

import FooterSVG from "./footer-socials-svg";

import "./footer-socials.css";

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"
import { SiGmail } from "react-icons/si"

export default function FooterSocials () {

    return (
        <div className="home-socials">
            
            <a href="https://github.com/Authier">
                <AiFillGithub
                className="home-socials-all"
                size={50} 
                style={{ fill: "url(#gradientFooter)"}}
                />
            </a>

            <a href="https://www.linkedin.com/in/jacobauthier/">
                <AiFillLinkedin
                className="home-socials-all"
                size={50} 
                style={{ fill: "url(#gradientFooter)",
                    marginRight:"10px"}}
                />
            </a>

            <a href="mailto:authierjacob@gmail.com">
                <SiGmail
                className="home-socials-all"
                size={50} 
                style={{ fill: "url(#gradientFooter)"}}
                />
            </a>

            <FooterSVG />

        </div>
    )
}