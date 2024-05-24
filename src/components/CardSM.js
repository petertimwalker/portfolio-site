import React from "react";
import CardInfo from "./CardInfo";

//Card Social Media
function CardSM(props) {
  return (
    <div className="d-inline-block ">
      {" "}
      <a href={props.item.link}>
        {" "}
        <img
          className="p-cardsm-image"
          src={props.item.imgSrc}
          alt={props.item.imgSrc}
        />
      </a>
    </div>
  );
}

export default CardSM;
