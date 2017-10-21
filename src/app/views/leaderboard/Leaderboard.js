// @flow weak

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { TopAgencies } from "../../components";

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
              <span className="nn-medium-orange">Rannde</span>
            </h1>
          </div>
        </div>
        <div className="col-md-12">
          <TopAgencies list={this.props.leaderboardData.topAgencies} />
        </div>
        {<pre>{JSON.stringify(this.props.leaderboardData, null, 2)}</pre>}
      </div>
    );
  }
}

export default Leaderboard;
