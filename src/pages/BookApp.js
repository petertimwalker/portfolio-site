import React from "react";
import Hero from "../components/Hero";
import Books from "../components/Books";
import SearchArea from "../components/SearchArea";

function BookApp(props) {
  return (
    <div className="App">
      <Hero title={props.title} subTitle={props.subTitle} text={props.text} />
      <Books />
    </div>
  );
}

export default BookApp;
