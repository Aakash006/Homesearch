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
            email: '',
            streetAd: '',
            city: '',
            neighbourhood: '',
            postalCode: '',
            province: '',
            country: '',
            listedPrice: '',
            soldPrice: '',
            mls: ''
        }
    }

    // change state of email
    changeEmail = async event => {
        const tempEmail = event.target.value;
        this.setState({email: tempEmail});
    }

    // change state of street Address
    changeStreetAd = async event => {
        const tempStreetAd = event.target.value;
        this.setState({streetAd: tempStreetAd});
    }

    // change state of city
    changeCity = async event => {
        const tempCity = event.target.value;
        this.setState({city: tempCity});
    }

    // change state of neighbourhood
    changeNeighbourhood = async event => {
        const tempNeighbourhood = event.target.value;
        this.setState({neighbourhood: tempNeighbourhood});
    }

    // change state of postal code
    changePostal = async event => {
        const tempPostal = event.target.value;
        this.setState({postalCode: tempPostal});
    }

    // change state of province
    changeProvince = async event => {
        const tempProvince = event.target.value;
        this.setState({province: tempProvince});
    }

    // change state of country
    changeCountry = async event => {
        const tempCountry = event.target.value;
        this.setState({country: tempCountry});
    }

    // change state of mls
    changeMLS = async event => {
        const tempMLS = event.target.value;
        this.setState({mls: tempMLS});
    }

    // change state of listed price
    changeListed = async event => {
        const tempListed = event.target.value;
        this.setState({listedPrice: tempListed});
    }

    // change state of sold price
    changeSold = async event => {
        const tempSold = event.target.value;
        this.setState({soldPrice: tempSold});
    }

    // does a put request with the payload as the property to be updated in the watchlist
    updateProperty = async (event) => {
        event.preventDefault();
        const payload = {
            email: this.state.email !== '' ? this.state.email : this.state.home.email,
            streetAd: this.state.streetAd !== '' ? this.state.streetAd : this.state.home.streetAd,
            city: this.state.city !== '' ? this.state.city : this.state.home.city,
            neighbourhood: this.state.neighbourhood !== '' ? this.state.neighbourhood : this.state.home.neighbourhood,
            postalCode: this.state.postalCode !== '' ? this.state.postalCode : this.state.home.postalCode,
            province: this.state.province !== '' ? this.state.province : this.state.home.province,
            country: this.state.country !== '' ? this.state.country : this.state.home.country,
            mls: this.state.mls !== '' ? this.state.mls : this.state.home.mls,
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
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={this.changeEmail} type="email" defaultValue={this.state.home.email} placeholder="email@example.com"/>
                            <Form.Text className="text-muted">Optional if you would like to get notifications for updates about this property</Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Street Address *</Form.Label>
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
                                <Form.Label>Neighbourhood *</Form.Label>
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
                                <Form.Label>MLS Number</Form.Label>
                                <Form.Control onChange={this.changeMLS} defaultValue={this.state.home.mls}/>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Listed Price *</Form.Label>
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
