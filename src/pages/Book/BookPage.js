import React from 'react'
import Hero from '../../components/Hero'
import BookSearch from './BookSearch'

function BookPage(props) {
  return (
    <div className="App">
      <Hero title={props.title} subTitle={props.subTitle} text={props.text} />
      <BookSearch />
    </div>
  )
}

export default BookPage
