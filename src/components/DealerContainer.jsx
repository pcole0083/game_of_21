import { connect } from "react-redux";
import * as actions from "../actions";

const mapStateToProps = state =>
  Object.assign(
    {},
    {
      hand: state.gamedata.dealer,
      playerSum: state.gamedata.playerSum,
      pVsum: state.gamedata.pVsum,
      dealerSum: state.gamedata.dealerSum,
      dVsum: state.gamedata.dVsum,
      owner: "dealer",
      turn: state.gamedata.turn
    }
  );
const mapDispatchToProps = actions;

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
