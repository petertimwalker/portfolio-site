import React from 'react'
import BookCard from './BookCard'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'

var sortedBooks = []

var handleClick = (i) => {
  sortedBooks.splice(i, 1)
}

const BookList = (props) => {
  var count = 0

  sortedBooks = props.books.sort((a, b) => {
    if (
      b.volumeInfo.publishedDate.substring(0, 4) ===
      a.volumeInfo.publishedDate.substring(0, 4)
    ) {
      if (a.volumeInfo.publishedDate.length === 4) {
        return 1
      } else if (b.volumeInfo.publishedDate.length === 4) {
        return -1
      } else if (
        b.volumeInfo.publishedDate.substring(5, 7) ===
        a.volumeInfo.publishedDate.substring(5, 7)
      ) {
        return (
          parseInt(b.volumeInfo.publishedDate.substring(8, 10)) -
          parseInt(a.volumeInfo.publishedDate.substring(8, 10))
        )
      }
      return (
        parseInt(b.volumeInfo.publishedDate.substring(5, 7)) -
        parseInt(a.volumeInfo.publishedDate.substring(5, 7))
      )
    }
    return (
      parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
      parseInt(a.volumeInfo.publishedDate.substring(0, 4))
    )
  })

  if (props.hasSpinner) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }
  if (props.hasNoResults) {
    return <h3>No results, check spelling</h3>
  }

  return (
    <div className="list">
      {sortedBooks.map((book, i) => {
        if (count < 3) {
          count++
          var link = `https://www.amazon.com/s?k=${book.volumeInfo.authors}+${book.volumeInfo.title}`

          return (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5px',
              }}
            >
              <Card>
                <BookCard
                  key={i}
                  image={book.volumeInfo.imageLinks.thumbnail}
                  title={book.volumeInfo.title}
                  published={book.volumeInfo.publishedDate}
                  author={book.volumeInfo.authors}
                  height={book.height}
                  link={link}
                />
                <Button
                  variant="danger"
                  onClick={() => {
                    handleClick(i)
                    props.handleRemove()
                  }}
                >
                  Remove
                </Button>
              </Card>
            </div>
          )
        }
      })}
    </div>
  )
}

export default BookList
