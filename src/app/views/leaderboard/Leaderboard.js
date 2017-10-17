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
        <div className="col-md-8">
          <Top10Meetings
            list={_.get(this.props, "leaderboardData.top10Meetings")}
          />
          <TopUMsPercentage
            list={_.get(this.props, "leaderboardData.topUMsPercentage")}
          />
          <pre>
            {JSON.stringify(
              _.get(this.props, "leaderboardData.top10Meetings"),
              null,
              2
            )}
          </pre>
        </div>
        <div className="col-md-4">
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
