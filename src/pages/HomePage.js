import React from 'react'
import Hero from '../components/Hero'
import Carousel from '../components/Carousel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function HomePage(props) {
  return (
    <div>
      <Hero
        title={props.title}
        subTitle={props.subTitle}
        text={props.text}
      ></Hero>

      <Carousel> </Carousel>
    </div>
  )
}

export default HomePage
