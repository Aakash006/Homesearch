import { React, Component } from "react";
import "../App.css";
import { Button, Row, Col, Card, Container, Badge  } from "react-bootstrap";
import api from "../api";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import { FaCalculator } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Home extends Component {
    constructor() {
        super();
        this.state = {
          homes: [],
          isLoaded: false
        }
    }

    // get all the homes in the watchlist
    refreshHouses = async () => {
        await api.getHomes().then(results => {
            this.setState({
                homes: results.data,
                isLoaded: true
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    componentDidMount = () => {
        this.refreshHouses();
    }

    // delete home in the watchlist
    deleteHouse = async (id) => {
        await api.deleteHome(id).then(results => {
            if (results.data.success === true) {
                toast.success('Property deleted');
                this.refreshHouses();
                console.log('deleted!');
            } else {
                toast.error('Property could not be deleted');
                console.log('Error!');
            }
        });
    }

    render() {
        return (
        <div>
            <ToastContainer/>
            <Container>
                <Row>
                    <h1 className="pageTitle">Watchlist</h1>
                    <Button href="/add-home" className="pageButton" variant="dark"><BiPlusMedical/> Add House</Button>
                </Row>
                {this.state.homes.length > 0 ?
                    (<Row>
                            {this.state.homes.map((home) => 
                            <Col md="4">
                                <Card className="houseCard" style={{ width: '18rem' }} bg="dark" text="white" key={home._id}>
                                    <Card.Body>
                                        <Card.Title className="streetAd">{home.streetAd}</Card.Title>
                                        <Card.Text className="extraAd">
                                            {home.city}, {home.province}, {home.country}
                                        </Card.Text>
                                        <Badge className="badge" pill variant="primary">{home.neighbourhood}</Badge><br></br>
                                        <Badge className="badge" pill variant="success">Listed Price: ${home.listedPrice}</Badge><br></br>
                                        {home.soldPrice > 0 ? <Badge className="badge" pill variant="danger">Sold Price: ${home.soldPrice}</Badge> : ''}
                                        <Row>
                                            <Button className="calculateBtn" variant="success" href={`/calculate-mortage/${home._id}`}><FaCalculator/></Button>
                                            <Button className="updateBtn" href={`/update-home/${home._id}`}><BsPencilSquare/></Button>
                                            <Button className="deleteBtn" variant="danger" onClick={() => this.deleteHouse(home._id)}><BsFillTrashFill/></Button>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>)}
                        </Row>) : (<h2>No properties in your watch</h2>)
                }
            </Container>
        </div>
        );
    }
}

export default Home;
