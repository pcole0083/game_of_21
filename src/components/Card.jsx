import React from "react";
import Loadable from "react-loadable";
import api from "../utils/api";

const Card = props => {
  let path =
    "./icons/" +
    props.suit.charAt(0).toUpperCase() +
    props.suit.substr(1).toLowerCase();
  let Icon = Loadable({
    loader: () => import(path),
    loading: () => <span>Loading...</span>,
    delay: 500
  });
  let displayValue = isNaN(props.value) ? props.value[0] : props.value;

  let cardClass = props.flipped ? "card flipped" : "card";

  return (
    <div className={cardClass}>
      <div className="face front">
        <span className="card-name top-left">{displayValue}</span>
        <span className={"suit "}>
          <Icon />
        </span>
        <span className="card-name bottom-right">{displayValue}</span>
      </div>
      <div
        className="face back"
        onClick={ev => {
          ev.preventDefault();
          let flipped = props.flipped;
          if (!flipped) {
            let newProps = Object.assign({}, props);
            newProps.hand[newProps.index].flipped = true;
            let cardsVisible = api.visibleValues(newProps.hand);
            let vSum = cardsVisible.reduce(api.sum, 0);
            props.flipAction(newProps.owner, [], 0);
            props.flipAction(newProps.owner, newProps.hand, vSum);
          }
        }}
      />
    </div>
  );
};

//if enough time should add propTypes

export default Card;
