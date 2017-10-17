// @flow weak

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  Top70Production,
  Top10Meetings,
  TopUMsPercentage
} from "../../components";

class Leaderboard extends PureComponent {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <div className="col-md-12">
          <div className="col-md-12">
            <h1>
              <span className="nn-light-orange">NN</span>{" "}
              <span className="nn-medium-orange">Maturity</span>
            </h1>
          </div>
        </div>
        <div className="col-md-12">
          <Top10Meetings
            list={_.get(this.props, "leaderboardData.top10Meetings")}
          />
          <TopUMsPercentage
            list={_.get(this.props, "leaderboardData.topUMsPercentage")}
          />
        </div>
        <div className="col-md-12">
          <Top70Production
            top70Production={_.get(
              this.props,
              "leaderboardData.top70Production"
            )}
          />
        </div>
      </div>
    );
  }
}

export default Leaderboard;
