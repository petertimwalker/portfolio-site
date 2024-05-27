import React from 'react'
import Card from 'react-bootstrap/Card'

const BookCard = (props) => {
  return (
    <Card style={{ width: 400, height: 500 }}>
      <a href={props.link} target="_blank">
        <Card.Img variant="center" height="300" radius="50" src={props.image} />
      </a>

      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>Author: {props.author}</Card.Text>
        <Card.Text>Published Date: {props.published}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Height: {props.height}</small>
      </Card.Footer>
    </Card>
  )
}

export default BookCard
