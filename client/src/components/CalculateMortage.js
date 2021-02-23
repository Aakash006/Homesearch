import { React, Component } from "react";
import "../App.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { BsFillCaretLeftFill } from "react-icons/bs";
import apis from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CalculateMortage extends Component {
    constructor() {
        super()
        this.state = {
            home: [],
            isLoaded: false,
            principal: '',
            interest: '',
            amortizationPeriod: '',
            mortage: ''
        }
    }

    // change state of email
    changePrincipal = async event => {
        const tempPrincipal = event.target.value;
        this.setState({principal: tempPrincipal});
    }

    // change state of street Address
    changeInterest = async event => {
        const tempInterest = event.target.value;
        this.setState({interest: tempInterest});
    }

    // change state of city
    changeAmortP = async event => {
        const tempAmortP = event.target.value;
        this.setState({amortizationPeriod: tempAmortP});
    }

    // calculates mortage based on users inputs of principal payments, interest and amortizationPeriod
    calculateMortage = async (event) => {
        event.preventDefault();
        let principal = this.state.principal !== '' ? this.state.principal : this.state.home.listedPrice;
        let interest = this.state.interest !== '' ? this.state.interest : 5;
        let amortP = this.state.amortizationPeriod !== '' ? this.state.amortizationPeriod : 25;

        let periodicRate = (interest/100)/12;
        let mortage = principal*((periodicRate*(Math.pow(1 + periodicRate, amortP*12)))/(Math.pow(1 + periodicRate, amortP*12) - 1));
        this.setState({mortage: mortage.toFixed(2)});
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
                    <h1 className="calTitle">Calculate mortage for '{this.state.home.streetAd}'</h1>
                    <Button href="/" className="calBackButton" variant="dark"><BsFillCaretLeftFill/> Home</Button>
                </Row><br></br>
                <Row><h2>* By default frequency is 12 months</h2></Row><br></br>
                <Row><h2 className="askingPrice">Asking Price: ${this.state.home.listedPrice}</h2></Row><br></br>

                <Form className="home-form" onSubmit={this.calculateMortage}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Principal ($)</Form.Label>
                                <Form.Control onChange={this.changePrincipal} defaultValue={this.state.home.listedPrice} required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Interest (%)</Form.Label>
                                <Form.Control onChange={this.changeInterest} defaultValue="5" required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Amortization Period</Form.Label>
                                <Form.Control onChange={this.changeAmortP} defaultValue="25" required/>
                            </Form.Group>
                        </Col>
                    </Row>
                    {this.state.mortage !== '' ? (<h1>Your monthly mortage would be: ${this.state.mortage}</h1>): ('')}
                    <Button type="submit" variant="success">Calculate</Button>
                    <Button className="cancelBtn" href="/" variant="danger">Cancel</Button>
                </Form>
            </Container>
        </div>
        );
    }
}

export default CalculateMortage;
