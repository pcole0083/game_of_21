import React from "react";
import transport from "../utils/transport";
import { Button } from "reactstrap";

import ButtonsContainer from "./ButtonsContainer";
import ButtonGroup from "./ButtonGroup";

const Buttons = ButtonsContainer(ButtonGroup);

export default class App extends React.Component {
  render() {
    return (
      <div className="game-board">
        <nav>
          <div className="nav-wrapper">
            <h1 className="brand-logo left">21</h1>
          </div>
        </nav>
        <Buttons />
      </div>
    );
  }
}
