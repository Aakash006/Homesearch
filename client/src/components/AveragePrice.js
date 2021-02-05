import { React, Component } from "react";
import "../App.css";
import { DropdownButton, Dropdown, Container, Row, Col } from "react-bootstrap";
import api from "../api";
import HouseCard from "./HouseCard";

class AveragePrice extends Component {
    constructor() {
        super();
        this.state = {
          neighbourhoods: [],
          homes: [],
          averagePrice: 0,
          choosenNeighbourhood: '',
          isLoaded: false
        }
    }

    componentDidMount = async () => {
        await api.getNeighbourhoods().then(results => {
            this.setState({
                neighbourhoods: results.data,
                isLoaded: true
            });
        }).catch((error) => {
            console.log(error)
        });
    }

    choseNeighbourhood = async (name) => {
        this.setState({choosenNeighbourhood: name, isLoaded: false});
        await api.getAverage(name).then(results => {
            this.setState({
                homes: results.data.homes,
                averagePrice: results.data.average,
                isLoaded: true
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
      return (
      <div>
        <Container>
            <Row>
                <h1 className="avgPageTitle">Average Price</h1>
                <DropdownButton className="neighbourhoodDD" variant="dark" size="lg" title="Neighbourhood">
                {
                    this.state.neighbourhoods.length > 0 ? (this.state.neighbourhoods.map((neighbourhood) => (
                    <Dropdown.Item key={neighbourhood._id} className="ddItem" as="button" onClick={() => this.choseNeighbourhood(neighbourhood.name)}>{neighbourhood.name}</Dropdown.Item>
                ))) : (<Dropdown.Item as="button">No neighbourhoods exist</Dropdown.Item>
                )
                }
                </DropdownButton>
            </Row>
            {(this.state.choosenNeighbourhood !== '' && this.state.averagePrice) > 0 ? (<h1>Average price for a property in {this.state.choosenNeighbourhood} is: ${this.state.averagePrice}</h1>): ('')}
            {(this.state.choosenNeighbourhood !== '' && this.state.averagePrice === 0) ||  this.state.averagePrice === null ? (<h3>No houses sold in {this.state.choosenNeighbourhood}</h3>) : ('') }
            {this.state.choosenNeighbourhood !== ''  ? (
                <Row>
                    {this.state.homes.length !== 0 ? (this.state.homes.map((home) => (<Col sm="4"><HouseCard house={home}/></Col>))) : ('')}
                </Row>
                ) : ('')}
        </Container>
      </div>
      );
    }
}

export default AveragePrice;
