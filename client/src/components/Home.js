import React from "react";
import "../App.css";
import { Button } from "react-bootstrap";
import api from '../api';

function Home() {
    return (
        <div>
            <h2>Watchlist</h2>
            <Button href="/add-home" variant="dark">Add House</Button>
            <ul>
                <li>
                    stuff
                </li>
            </ul>
        </div>
    );
}

export default Home;
