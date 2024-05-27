import React from 'react';
import Hero from '../components/Hero';
import Content from '../components/Content';

function AboutPage(props) {
  return (
    <div>
      <Hero title={props.title}></Hero>
      <Content>
        <p>
          I graduated UMass Amherst with a BS in Computer Science in May of
          2021. Since then I haven't worked on this app in a long time but
          recently found it on an old laptop from college so I'm cleaning it up
          and implementing some best practices. For starters I'm creating a
          simple server on an EC2 where this app can request the Google Books
          Api without exposing it to the world.
        </p>
        <p>I'm proficent in Java, C/C++, Javascript, React.js</p>
        <p>I work with Docker, Node.js, MongoDB, Ubuntu, AWS EC2 and S3</p>
        <p>
          I'm passionate about snowboarding, basketball, and learning new
          technologies
        </p>
      </Content>
    </div>
  );
}

export default AboutPage;
