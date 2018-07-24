// @flow weak

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Bar as BarChart } from "react-chartjs";
import {
  TopAgencies,
  TopUMsPercentage,
  TopAgentsPercentage,
  Top70Production
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
              <span className="nn-medium-orange">Rannde</span>{" "}
              <span className="nn-dark-orange">1</span>
            </h1>
          </div>
        </div>
        <div className="col-md-12">
          <TopAgencies list={this.props.leaderboardData.topAgencies} />
          <TopUMsPercentage
            list={this.props.leaderboardData.topUMsPercentage}
          />
          <TopAgentsPercentage
            list={this.props.leaderboardData.topAgentsPercentage}
          />
          <Top70Production list={this.props.leaderboardData.top70Production} />
          <div className="col-md-12">
            <h2 className="">Top 10 poradců a jejich APE</h2>
          </div>
          <BarChart
            data={{
              labels: _.map(this.props.leaderboardData.timeline, datapoint => {
                return _.get(datapoint, "jmeno");
              }),
              datasets: [
                {
                  data: _.map(
                    this.props.leaderboardData.timeline,
                    datapoint => {
                      return _.get(datapoint, "produkce");
                    }
                  ),
                  fillColor: "#7caad6"
                }
              ]
            }}
            width="1180"
            height="400"
          />
        </div>
      </div>
    );
  }
}

export default Leaderboard;
