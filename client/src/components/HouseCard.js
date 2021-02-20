import React from "react";
import "../App.css";
import { Card, Badge } from "react-bootstrap";
function HouseCard(props) {
    return (
        <div>
            <Card className="houseCard" style={{ width: '18rem' }} bg="dark" text="white">
                <Card.Body>
                    <Card.Title className="streetAd">{props.house.streetAd}</Card.Title>
                    <Card.Text className="extraAd">
                      {props.house.city}, {props.house.province}, {props.house.country}
                    </Card.Text>
                    <Badge className="badge" pill variant="primary">{props.house.neighbourhood}</Badge><br></br>
                    <Badge className="badge" pill variant="success">Listed Price: ${props.house.listedPrice}</Badge><br></br>
                    {props.house.soldPrice > 0 ? <Badge className="badge" pill variant="danger">Sold Price: ${props.house.soldPrice}</Badge> : ''} 
                </Card.Body>
            </Card>
        </div>
    );
}

export default HouseCard;
