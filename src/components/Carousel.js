import React from 'react';
import Card from '../components/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import library from '../assets/images/library.jpg';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 0,
          title: 'BookApp',
          subTitle:
            'Returns an authors last three published books that fit your bookshelf',
          imgSrc: library,
          link: '/bookapp',
          selected: true,
        },
      ],
    };
  }

  handleCardClick = (id, card) => {
    let items = [...this.state.items];

    items[id].selected = items[id].selected ? false : true;

    items.forEach((item) => {
      if (item.id !== id) {
        item.selected = false;
      }
    });

    this.setState({
      items,
    });
  };

  makeItems = (items) => {
    return items.map((item) => {
      return (
        <Card
          item={item}
          click={(e) => this.handleCardClick(item.id, e)}
          key={item.id}
        />
      );
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
/*
{
          id: 0,
          title: "gitHub",
          subTitle: "link to gitHub below",
          imgSrc: IMG_0760,
          link: "https://github.com/petertwalker",
          selected: false,
        },
        {
          id: 1,
          title: "Linkedin",
          subTitle: "link to Linkedin below",
          imgSrc: cowboy,
          link: "https://www.linkedin.com/in/petertwalker/",
          selected: false,
        },*/
export default Carousel;
