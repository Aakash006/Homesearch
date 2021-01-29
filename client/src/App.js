import React from "react";
import "./App.css";
import { Navbar, Nav } from "react-bootstrap";
import AveragePrice from "./components/AveragePrice";
import Home from "./components/Home";
import AddHome from "./components/AddHome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Router>
                <Navbar collapseOnSelect="true" expand="lg" bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand>HomeSearch</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/average-price">Average Price</Nav.Link>
                        </Nav>
                </Navbar>
                <Switch>
                    <Route exact path="/" activeClassName="active" component={Home}/>
                    <Route exact path="/average-price" activeClassName="active" component={AveragePrice}/>
                    <Route exact path="/add-home" activeClassName="active" component={AddHome}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
