import React from "react";
import Card from "./Card";
import CardSM from "./CardSM";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import github from "../assets/images/github.svg";
import linkedin from "../assets/images/linkedin.png";
import handshake from "../assets/images/handshake.png";

//Carousel Social Media
class CarouselSM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 0,
          imgSrc: github,
          link: "https://github.com/petertwalker",
        },
        {
          id: 1,
          imgSrc: linkedin,
          link: "https://www.linkedin.com/in/petertwalker/",
        },
        {
          id: 2,
          imgSrc: handshake,
          link: "https://umass.joinhandshake.com/users/7537283",
        },
      ],
    };
  }

  makeItems = (items) => {
    return items.map((item) => {
      return <CardSM item={item} key={item.id} />;
    });
  };

  render() {
    return (
      <Container fluid={true}>
        <Row className="justify-content-around">
          {this.makeItems(this.state.items)}
        </Row>
      </Container>
    );
  }
}

export default CarouselSM;
