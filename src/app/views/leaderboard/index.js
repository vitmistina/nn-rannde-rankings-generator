// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as viewsActions from "../../redux/modules/views";
import Leaderboard from "./Leaderboard";
import "./leaderboard.scss";

const mapStateToProps = state => {
  return {
    leaderboardData: state.leaderboardData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
