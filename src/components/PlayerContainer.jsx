import { connect } from "react-redux";
import * as actions from "../actions";

const mapStateToProps = state =>
  Object.assign(
    {},
    {
      hand: state.gamedata.player,
      playerSum: state.gamedata.playerSum,
      pVsum: state.gamedata.pVsum,
      dealerSum: state.gamedata.dealerSum,
      dVsum: state.gamedata.dVsum,
      owner: "player",
      turn: state.gamedata.turn
    }
  );
const mapDispatchToProps = actions;

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
