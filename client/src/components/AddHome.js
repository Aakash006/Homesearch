import React from "react";
import "../App.css";
import { Button } from "react-bootstrap";

function AddHome() {
    return (
        <div>
            <h2>Add Home</h2>
            <Button href="/" variant="success">Submit</Button>
            <Button href="/" variant="danger">Cancel</Button>
        </div>
    );
}

export default AddHome;
