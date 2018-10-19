import { connect } from "react-redux";
import * as actions from "../actions";

const mapStateToProps = state => state.buttons;
const mapDispatchToProps = actions;

export default connect(
  mapStateToProps,
  mapDispatchToProps
);

// import React, { Component } from "react";

// const ButtonsContainer = ButtonsComponent => {
//   return class App extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         deck_id: "",
//         allCards: [],
//         player: [],
//         dealer: [],
//         dealerValues: [],
//         playerValues: [],
//         playerSum: 0,
//         dealerSum: 0,
//         winsPlayer: 0,
//         winsDealer: 0,
//         turn: "player"
//       };
//     }

//     getData = path => {
//       const API_URL = "https://deckofcardsapi.com/api/deck/";
//       let callPath = API_URL + path;
//       return transport.get(callPath);
//     };
//     startGame = () => {
//       let path = "new/draw/?count=4";
//       this.getData(path).then(json => {
//         this.setState({
//           ...this.state,
//           deck_id: json.deck_id,
//           player: [json.cards[0], json.cards[2]],
//           dealer: [json.cards[1], json.cards[3]]
//         });
//       });
//     };
//     drawCard = () => {
//       let whosTurn = this.state.turn;
//       let path = this.state.data.deck_id + "/draw/?count=1";
//       this.getData(path).then(json => {
//         let tempState = this.state;
//         tempState[whosTurn].cards.push(json.cards[0]);
//         this.setState({
//           ...this.state,
//           ...tempState
//         });
//       });
//     };

//     render() {
//       return (
//         <ButtonsComponent onStart={this.startGame} onDraw={this.drawCard} />
//       );
//     }
//   };
// };

// export default ButtonsContainer;
