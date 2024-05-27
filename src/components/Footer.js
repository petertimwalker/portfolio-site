import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CarouselSM from './CarouselSM';

function Footer() {
  return (
    <footer className="mt-5">
      <Container fluid={true}>
        <Row className="border-top justify-content-between p-3">
          <Col className="p-2" md={3} sm={12}>
            This site was created by Peter T. Walker
          </Col>

          <Col className="p-0  justify-content-end" md={2}>
            <Row>
              <CarouselSM></CarouselSM>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
