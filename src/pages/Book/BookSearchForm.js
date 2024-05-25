import React from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/Button";

const BookSearchForm = (props) => {
        return (
                <Form onSubmit={props.searchBook} action="" style={{ width: 400 }}>
                        <Form.Group>
                                <Form.Label>name of author</Form.Label>
                                <Form.Control
                                        placeholder="First Last"
                                        onChange={props.handleSearch}
                                        type="text"
                                />
                        </Form.Group>

                        <Form.Group>
                                <Form.Label>enter height of bookshelf</Form.Label>
                                <Form.Control
                                        onChange={props.handleHeight}
                                        type="text"
                                        placeholder="inches"
                                />
                                <Form.Text className="text-muted">
                                        leave empty for no height constraint
                                </Form.Text>
                        </Form.Group>
                        <Button onClick={props.handleClickSearch} variant="primary" type="submit">
                                Search
                        </Button>
                </Form>
        );
};
/*

*/

export default BookSearchForm;
