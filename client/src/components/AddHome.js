import { React, Component } from "react";
import "../App.css";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { BsFillCaretLeftFill } from "react-icons/bs";
import apis from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class AddHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streetAd: '',
            city: '',
            neighbourhood: '',
            postalCode: '',
            province: '',
            country: '',
            listedPrice: '',
            soldPrice: '',
            showSuccess: false,
            showError: false
        }
    }

    changeStreetAd = async event => {
        const tempStreetAd = event.target.value;
        this.setState({streetAd: tempStreetAd});
    }

    changeCity = async event => {
        const tempCity = event.target.value;
        this.setState({city: tempCity});
    }

    changeNeighbourhood = async event => {
        const tempNeighbourhood = event.target.value;
        this.setState({neighbourhood: tempNeighbourhood});
    }

    changePostal = async event => {
        const tempPostal = event.target.value;
        this.setState({postalCode: tempPostal});
    }

    changeProvince = async event => {
        const tempProvince = event.target.value;
        this.setState({province: tempProvince});
    }

    changeCountry = async event => {
        const tempCountry = event.target.value;
        this.setState({country: tempCountry});
    }

    changeListed = async event => {
        const tempListed = event.target.value;
        this.setState({listedPrice: tempListed});
    }

    changeSold = async event => {
        const tempSold = event.target.value;
        this.setState({soldPrice: tempSold});
    }

    submitProperty = async (event) => {
        event.preventDefault();
        const payload = {
            streetAd: this.state.streetAd,
            city: this.state.city,
            neighbourhood: this.state.neighbourhood,
            postalCode: this.state.postalCode,
            province: this.state.province,
            country: this.state.country,
            listedPrice: this.state.listedPrice,
            soldPrice: this.state.soldPrice
        };

        await apis.createHome(payload).then(results => {
            if (results.data.success === true) {
                toast.success('Property has been added');
                console.log('created!');
            } else {
                toast.error('Property could not be added, please check your input');
                console.log('fail!');
            }
        }).catch((error) => {
            toast.error('Property could not be added');
            console.log(error);
        });
    }

    render() {
        return (
        <div>
            <ToastContainer/>
            <Container>
                <Row>
                    <h1 className="pageTitle">Add Home</h1>
                    <Button href="/" className="backButton"variant="dark"><BsFillCaretLeftFill/> Home</Button>
                </Row>
                <Form className="home-form" onSubmit={this.submitProperty}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Street Address</Form.Label>
                                <Form.Control onChange={this.changeStreetAd} placeholder="Enter Street Address" required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control onChange={this.changeCity} placeholder="Enter City"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Neighbourhood</Form.Label>
                                <Form.Control onChange={this.changeNeighbourhood} placeholder="Enter Neighbourhood" required/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control onChange={this.changePostal} placeholder="Enter Postal Code"/>
                            </Form.Group>
                        </Col>

                        <Col>
                        <Form.Group>
                            <Form.Label>Province</Form.Label>
                            <Form.Control onChange={this.changeProvince} placeholder="Enter Province"/>
                        </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Country</Form.Label>
                                <Form.Control onChange={this.changeCountry} placeholder="Enter Country"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Listed Price</Form.Label>
                                <Form.Control onChange={this.changeListed} placeholder="Enter Listed Price" required/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Sold Price</Form.Label>
                                <Form.Control onChange={this.changeSold} placeholder="Enter Sold Price"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button className="submitBtn" type="submit" variant="success">Create</Button>
                    <Button className="cancelBtn" href="/" variant="danger">Cancel</Button>
                </Form>
            </Container>
        </div>
        );
    }
}

export default AddHome;
