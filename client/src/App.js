import React from "react";
import "./App.css";
import { Navbar, Nav } from "react-bootstrap";
import AveragePrice from "./components/AveragePrice";
import Home from "./components/Home";
import AddHome from "./components/AddHome";
import UpdateHome from "./components/UpdateHome";
import AddByMLS from "./components/AddByMLS";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Router>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                    <Navbar.Brand className="navTitle">HomeSearch</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Nav className="mr-auto">
                        <Nav.Link className="navLink" href="/" exact>Home</Nav.Link>
                        <Nav.Link className="navLink" href="/average-price">Average Price</Nav.Link>
                        <Nav.Link className="navLink" href="/search-mls">Add By MLS #</Nav.Link>
                    </Nav>
                </Navbar>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/average-price" component={AveragePrice}/>
                    <Route exact path="/add-home" component={AddHome}/>
                    <Route exact path="/update-home/:id" component={UpdateHome}/>
                    <Route exact path="/search-mls" component={AddByMLS}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;