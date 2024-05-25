import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./App.css";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BookPage from "./pages/BookPage";
import ContactPage from "./pages/ContactPage";

class App extends React.Component {
        constructor(props) {
                super(props);
                this.state = {
                        title: "Peter T. Walker",
                        headerLinks: [
                                { title: "Home", path: "/" },
                                { title: "About", path: "/about" },
                                //{ title: "Contact", path: "/contact" },
                        ],
                        home: {
                                title: "Hello",
                                subTitle: "Welcome to my portfolio",
                                text: "Check out my projects below",
                        },
                        about: {
                                title: "About Me",
                        },
                        contact: {
                                title: "Get In Touch",
                        },
                        bookapp: {
                                title: "Book App",
                                subTitle: "",
                                text:
                                        "returns last three published books from given author that fit within the given height",
                        },
                };
        }
        render() {
                return (
                        <Router>
                                <Container className="p-0" fluid={true}>
                                        <Navbar className="border-bottom" bg="transparent" expand="lg">
                                                <Navbar.Brand>Peter T. Walker</Navbar.Brand>
                                                <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
                                                <Navbar.Collapse id="navbar-toggle">
                                                        <Nav className="ml-auto">
                                                                <Link className="nav-link" to="/">
                                                                        Home
                                                                </Link>
                                                                <Link className="nav-link" to="/about">
                                                                        About
                                                                </Link>
                                                        </Nav>
                                                </Navbar.Collapse>
                                        </Navbar>
                                        <Route
                                                path="/"
                                                exact
                                                render={() => (
                                                        <HomePage
                                                                title={this.state.home.title}
                                                                subTitle={this.state.home.subTitle}
                                                                text={this.state.home.text}
                                                        />
                                                )}
                                        />
                                        <Route
                                                path="/about"
                                                render={() => <AboutPage title={this.state.about.title} />}
                                        />
                                        <Route
                                                path="/contact"
                                                render={() => <ContactPage title={this.state.contact.title} />}
                                        />

                                        <Route
                                                path="/bookapp"
                                                render={() => (
                                                        <BookPage
                                                                title={this.state.bookapp.title}
                                                                subTitle={this.state.bookapp.subTitle}
                                                                text={this.state.bookapp.text}
                                                        />
                                                )}
                                        />
                                        <Footer></Footer>
                                </Container>
                        </Router>
                );
        }
}

export default App;
