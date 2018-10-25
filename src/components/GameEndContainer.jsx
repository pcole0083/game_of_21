import { connect } from "react-redux";
import * as actions from "../actions";

const mapStateToProps = state => Object.assign({}, state.gamedata);
const mapDispatchToProps = actions;

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
