import React from "react";
import "../App.css";
import { Button } from "react-bootstrap";

function AddHome() {
    return (
        <div>
            <h2>Update Home</h2>
            <Button href="/" variant="success">Update</Button>
            <Button href="/" variant="danger">Cancel</Button>
        </div>
    );
}

export default AddHome;
