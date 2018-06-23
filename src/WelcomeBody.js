import React from "react";
import axios from "./axios";
import {Link} from "react-router-dom";


export default function WelcomeBody(){
    return(
        <div id="welcomeBody">

            <div id="welcomeBackground">
                <img src="assets/realskylake.jpg"/>
                <div id="welcomeBackgroundText">
                    <h1>Tageskarten unkompliziert online kaufen.</h1>
                </div>
            </div>

            <div id="welcomeText">
                <div id="welcomeTextOne">
                    <h1>Für Angler</h1>
                    <div id="pTagOne">
                        <p>Im Tagestakt attackiert die CSU die Kanzlerin. Nach dem Migrationsthema nimmt sie nun auch den Eurozonen-Plan ins Visier. Um die Sache allein geht es längst nicht mehr, die Atmosphäre ist vergiftet. Im Tagestakt attackiert die CSU die Kanzlerin. Nach dem Migrationsthema nimmt sie nun auch den Eurozonen-Plan ins Visier. Um die Sache allein geht es längst nicht mehr, die Atmosphäre ist vergiftet.</p>
                    </div>
                </div>
                <div id="welcomeTextTwo">
                    <h1>Für Vereine</h1>
                    <div id="pTagTwo">
                        <p>Im Tagestakt attackiert die CSU die Kanzlerin. Nach dem Migrationsthema nimmt sie nun auch den Eurozonen-Plan ins Visier. Um die Sache allein geht es längst nicht mehr, die Atmosphäre ist vergiftet.Im Tagestakt attackiert die CSU die Kanzlerin. Nach dem Migrationsthema nimmt sie nun auch den Eurozonen-Plan ins Visier. Um die Sache allein geht es längst nicht mehr, die Atmosphäre ist vergiftet.</p>
                    </div>
                </div>
            </div>

            <div id="welcomeFooter">
                <Link to="/contact"><h3>Kontakt</h3></Link>
                <h3>Impressum</h3>
                <h3>Social Media</h3>
                <h3>Über uns</h3>
            </div>


        </div>
    );
}
