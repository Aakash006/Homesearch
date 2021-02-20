import { React, Component } from "react";
import "../App.css";
import { Button, Container, Row, Col, Card, Badge } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { BiPlusMedical } from "react-icons/bi";
import apis from "../api";
import { ToastContainer, toast } from "react-toastify";

class SearchMLS extends Component {
    constructor() {
        super();
        this.state = {
          homes: [],
          mlsNum: '',
          searchBtnPressed: false,
          loading: false
        }
    }

    changeMLS = async (event) => {
        let tempMls = event.target.value;
        tempMls = tempMls.replace(/\s+/g, '');
        this.setState({mlsNum : tempMls});
    }

    searchHouse = async () => {
        this.setState({searchBtnPressed: true, loading: true});
        await fetch(`https://realtor-canadian-real-estate.p.rapidapi.com/properties/list-by-mls?ReferenceNumber=${this.state.mlsNum}&CultureId=1`, {
            method: 'GET',
            headers: new Headers({'x-rapidapi-host' : process.env.REACT_APP_REALTOR_HOST, 'x-rapidapi-key': process.env.REACT_APP_REALTOR_KEY})
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            this.parseAddress(data.Results[0].Property.Address.AddressText, data.Results[0].Property.PriceUnformattedValue, data.Results[0].PostalCode);
        }).catch((error) => {
            console.error(error);
        });
    }

    addHome = async (home) => {
        const payload = {
            email: null,
            streetAd: home.streetAd,
            city: home.city,
            neighbourhood: home.neighbourhood,
            postalCode: home.postalCode,
            province: home.province,
            country: home.country,
            listedPrice: home.listedPrice,
            soldPrice: home.soldPrice,
            mls: home.mls
        };

        await apis.createHome(payload).then(results => {
            if (results.data.success === true) {
                toast.success('Property has been added');
                console.log('created!');
            } else {
                toast.error(`Property could not be added, ${results.data.message}`);
                console.log('fail!');
            }
        }).catch((error) => {
            toast.error('Property could not be added');
            console.log(error);
        });
    }

    parseAddress = (address, price, postalCode) => {
        let pipeIndex = address.indexOf("|");
        let streetAd = address.substring(0, pipeIndex);
        let commaIndex = address.indexOf(",");
        let city = address.substring(pipeIndex + 1, commaIndex);
        address = address.substring(commaIndex + 2);
        let spaceIndex = address.indexOf(" ");
        let province = address.substring(0, spaceIndex);
        let home = [{streetAd: streetAd, city: city, neighbourhood: '', postalCode: postalCode, province: province, country: 'Canada', listedPrice: price, soldPrice: '', mls: this.state.mlsNum}];
        console.log(home);
        this.setState({homes: home, loading: false});
    }

    render() {
      return (
      <div>
        <ToastContainer/>
        <Container>
            <Row>
                <h1 className="searchTitle">Add By MLS Number</h1>
            </Row>
            <input
                className="searchBar"
                placeholder={"MLS Number"}
                value={this.state.mlsNum}
                onChange={this.changeMLS}
            />
            <Button className="searchBtn" onClick={this.searchHouse}><BsSearch/></Button>
                {this.state.mlsNum !== '' && this.state.searchBtnPressed === true && this.state.loading === false ? (
                <Row>
                    {this.state.homes.length > 0 ?
                    (<Row>
                            {this.state.homes.map((home) => 
                            <Col md="4">
                                <Card className="houseCard" style={{ width: '18rem' }} bg="dark" text="white">
                                    <Card.Body>
                                        <Card.Title className="streetAd">{home.streetAd}</Card.Title>
                                        <Card.Text className="extraAd">
                                            {home.city}, {home.province}, {home.country}
                                        </Card.Text>
                                        <Badge className="badge" pill variant="success">Listed Price: ${home.listedPrice}</Badge><br></br>
                                        <Row>
                                            <Button className="addMlsBtn" onClick={() => this.addHome(home)}><BiPlusMedical/> Add</Button>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>)}
                        </Row>) : (<h2>No properties exist with the requested MLS Number</h2>)
                    }
                </Row>
                ) : ('')}
        </Container>
      </div>
      );
    }
}

export default SearchMLS;
