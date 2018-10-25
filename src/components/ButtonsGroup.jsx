import React, { Component } from "react";
import api from "../utils/api";
import M from "materialize-css";

export default class ButtonsGroup extends Component {
  // get a reference to the element after the component has mounted
  componentDidMount() {
    const floatingButtons = M.FloatingActionButton.init(this.buttonNav);
    floatingButtons.open(); //for now keep open at start
    const buttons = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(buttons);
  }
  componentDidUpdate(prevProps) {
    const props = this.props;
    if (
      props.deck_id &&
      props.turn === "dealer" &&
      (props.dealerSum > 0 && props.playerSum > 0) &&
      props.dealerSum <= props.playerSum &&
      props.dealer.length < 5 &&
      (props.dealerSum <= 21 && props.playerSum <= 21)
    ) {
      setTimeout(() => {
        this.drawACard();
      }, 1000);
    }
  }
  drawACard() {
    if (!this.props.deck_id) {
      return api.startGame().then(json => {
        this.props.startAction(...json);
      });
      //alert("Start a new game first! (the red button)");
    }
    api.drawCard(this.props.deck_id, this.props.turn, this.props).then(json => {
      //because connect only does a shallow check, run a reset then the real json data.
      this.props.drawAction(...[[], 0, [], [], 0, []]);
      this.props.drawAction(...json);
    });
  }
  render() {
    return (
      <div className="buttons-wrapper">
        <div
          className="fixed-action-btn"
          ref={buttonNav => {
            this.buttonNav = buttonNav;
          }}
        >
          <a
            onClick={ev => {
              ev.preventDefault();
              if (
                this.props.turn === "player" &&
                this.props.player.length < 5
              ) {
                this.drawACard();
              }
            }}
            className="btn-floating btn-large blue tooltipped"
            title="Draw a Card"
            data-position="left"
            data-tooltip="Draw a Card"
          >
            <i className="large material-icons draw">crop_original</i>
          </a>
          <ul>
            <li>
              <a className="btn-floating lime darken-3">
                <span className="text-white">W:{this.props.winsPlayer}</span>
              </a>
            </li>
            <li>
              <a className="btn-floating indigo darken-2">
                <span className="text-white">L:{this.props.winsDealer}</span>
              </a>
            </li>
            <li
              className="tooltipped"
              data-position="left"
              data-tooltip="Visible Totals"
            >
              <a className="btn-floating blue-grey">
                <span className="text-white">
                  {this.props.pVsum}/{this.props.dVsum}
                </span>
              </a>
            </li>
            <li
              className="tooltipped"
              data-position="left"
              data-tooltip="End Turn"
            >
              <a
                onClick={ev => {
                  ev.preventDefault();
                  if (!this.props.deck_id) {
                    M.toast({ html: "Start a new game first (red button)!" });
                    return;
                  }
                  this.props.turnAction("dealer");
                }}
                className="btn-floating btn-large orange"
                title="Dealer's Turn"
              >
                <i className="large material-icons deck">undo</i>
              </a>
            </li>
            <li
              className="tooltipped"
              data-position="left"
              data-tooltip="New Game"
            >
              <a
                onClick={ev => {
                  ev.preventDefault();
                  api.startGame().then(json => {
                    this.props.startAction(...json);
                  });
                }}
                className="btn-floating btn-large red darken-2"
                title="New Game"
              >
                <i className="large material-icons deck">layers</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
