// @flow weak

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Top70Production } from "../../components";

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
        <Top70Production
          top70Production={_.get(this.props, "leaderboardData.top70Production")}
        />
        <pre>
          {JSON.stringify(
            _.get(this.props, "leaderboardData.top70Production"),
            null,
            2
          )}
        </pre>
      </div>
    );
  }
}

export default Leaderboard;
