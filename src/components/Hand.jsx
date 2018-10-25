import React from "react";
import Card from "./Card";

const Hand = props => {
  let pSum = Number(props.playerSum);
  let dSum = Number(props.dealerSum);
  let hideHand = "hand";
  //debugger;

  return (
    <div className={hideHand}>
      {Object.keys(props.hand).map((key, i) => {
        let hand = props.hand;
        if (!hand[key].suit) {
          return null;
        }
        return (
          <Card
            key={"card_" + hand[key].code}
            suit={hand[key].suit}
            value={hand[key].value}
            flipped={hand[key].flipped}
            owner={props.owner}
            flipAction={props.flipAction}
            hand={hand}
            index={i}
          />
        );
      })}
    </div>
  );
};

//if enough time should add propTypes

export default Hand;
