import React from "react";
import "../App.css";
import { DropdownButton, Dropdown } from "react-bootstrap";

function AveragePrice() {
    return (
      <div>
        <h2>Average Price</h2>
        <DropdownButton variant="dark" title="Neighbourhood">
          <Dropdown.Item as="button">Action</Dropdown.Item>
        </DropdownButton>
      </div>
    );
}

export default AveragePrice;
