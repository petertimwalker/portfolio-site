import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Hero from '../components/Hero';
import Content from '../components/Content';

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      disabled: false,
      emailSent: null,
    };
  }

  handleChange = (event) => {
    console.log(event);

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ disabled: true });
  };

  render() {
    return (
      <div>
        <Hero title={this.props.title} />
        <Row className="justify-content-center">
          <Col md={8} sm={12}>
            <h2 className=" font-weight-bold">Backend not connected online</h2>
            <p className="lead font-weight-light">
              Feel free to email me, petertwalker@gmail.com
            </p>
          </Col>
        </Row>

        <Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="full-name">Full Name</Form.Label>
              <Form.Control
                id="full-name"
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="message">Message</Form.Label>
              <Form.Control
                id="message"
                name="message"
                as="textarea"
                rows="3"
                value={this.state.message}
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>
            <Button
              className="d-inline-block"
              variant="primary"
              type="submit"
              disabled={this.state.disabled}
            >
              Submit
            </Button>

            {this.state.emailSent === true && (
              <p className="d-inline success-message">Email Sent</p>
            )}
            {this.state.emailSent === false && (
              <p className="d-inline error-message">Email Not Sent</p>
            )}
          </Form>
        </Content>
      </div>
    );
  }
}

export default ContactPage;
