import React, { Component } from "react";
import api from "../utils/api";
import M from "materialize-css";

export default class ButtonsGroups extends Component {
  // get a reference to the element after the component has mounted
  componentDidMount() {
    const instance = M.FloatingActionButton.init(this.buttonNav);
    instance.open(); //for now keep open at start
  }
  render() {
    return (
      <div
        className="fixed-action-btn"
        ref={buttonNav => {
          this.buttonNav = buttonNav;
        }}
      >
        <a
          onClick={ev => {
            ev.preventDefault();
            api
              .drawCard(this.props.deck_id, this.props.turn, this.props)
              .then(json => {
                console.log(json);
                this.props.drawAction(...json);
              });
          }}
          className="btn-floating btn-large blue"
          title="Start Game"
        >
          <i className="large material-icons draw">crop_original</i>
        </a>
        <ul>
          <li>
            <a className="btn-floating red">
              <span className="text-white">W:{this.props.winsPlayer}</span>
            </a>
          </li>
          <li>
            <a className="btn-floating yellow darken-1">
              <span className="text-white">{this.props.dealerSum}</span>
            </a>
          </li>
          <li>
            <a className="btn-floating green">
              <span className="text-white">{this.props.playerSum}</span>
            </a>
          </li>
          <li>
            <a
              onClick={ev => {
                ev.preventDefault();
                console.log(this.props);
                api.startGame().then(json => {
                  this.props.startAction(...json);
                });
              }}
              className="btn-floating btn-large red"
              title="Draw Card"
            >
              <i className="large material-icons deck">layers</i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
