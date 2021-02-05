import { React, Component } from "react";
import "../App.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { BsFillCaretLeftFill } from "react-icons/bs";
import apis from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class UpdateHome extends Component {
    constructor() {
        super()
        this.state = {
            home: [],
            isLoaded: false,
            streetAd: '',
            city: '',
            neighbourhood: '',
            postalCode: '',
            province: '',
            country: '',
            listedPrice: '',
            soldPrice: ''
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

    updateProperty = async (event) => {
        event.preventDefault();
        const payload = {
            streetAd: this.state.streetAd !== '' ? this.state.streetAd : this.state.home.streetAd,
            city: this.state.city !== '' ? this.state.city : this.state.home.city,
            neighbourhood: this.state.neighbourhood !== '' ? this.state.neighbourhood : this.state.home.neighbourhood,
            postalCode: this.state.postalCode !== '' ? this.state.postalCode : this.state.home.postalCode,
            province: this.state.province !== '' ? this.state.province : this.state.home.province,
            country: this.state.country !== '' ? this.state.country : this.state.home.country,
            listedPrice: this.state.listedPrice !== '' ? this.state.listedPrice : this.state.home.listedPrice,
            soldPrice: this.state.soldPrice !== '' ? this.state.soldPrice : this.state.home.soldPrice
        }

        await apis.updateHome(this.props.match.params.id, payload).then(results => {
            if (results.data.success === true) {
                toast.success('Property has been updated');
                console.log('updated!');
            } else {
                toast.error('Property could not be updated, please check your input');
                console.log('fail!');
            }
        }).catch((error) => {
            toast.error('Property could not be updated');
            console.log(error);
        });
    }


    componentDidMount = async () => {
        await apis.getHomeByID(this.props.match.params.id).then(results => {
            this.setState({
                home: results.data,
                isLoaded: true
            });
        }).catch((error) => {
            console.log(error);
            toast.error('Error finding the home you want to update');
        });
    }

    render() {
        return (
        <div>
            <ToastContainer/>
            <Container>
                <Row>
                    <h1 className="pageTitle">Update Home</h1>
                    <Button href="/" className="backButton" variant="dark"><BsFillCaretLeftFill/> Home</Button>
                </Row>
                <Form className="home-form" onSubmit={this.updateProperty}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Street Address</Form.Label>
                                <Form.Control onChange={this.changeStreetAd} defaultValue={this.state.home.streetAd} required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control onChange={this.changeCity} defaultValue={this.state.home.city}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Neighbourhood</Form.Label>
                                <Form.Control onChange={this.changeNeighbourhood} defaultValue={this.state.home.neighbourhood} required/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control onChange={this.changePostal} defaultValue={this.state.home.postalCode}/>
                            </Form.Group>
                        </Col>

                        <Col>
                        <Form.Group>
                            <Form.Label>Province</Form.Label>
                            <Form.Control onChange={this.changeProvince} defaultValue={this.state.home.province}/>
                        </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Country</Form.Label>
                                <Form.Control onChange={this.changeCountry} defaultValue={this.state.home.country}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Listed Price</Form.Label>
                                <Form.Control onChange={this.changeListed} defaultValue={this.state.home.listedPrice} required/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Sold Price</Form.Label>
                                <Form.Control onChange={this.changeSold} defaultValue={this.state.home.soldPrice}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" variant="success">Update</Button>
                    <Button className="cancelBtn" href="/" variant="danger">Cancel</Button>
                </Form>
            </Container>
        </div>
        );
    }
}

export default UpdateHome;
