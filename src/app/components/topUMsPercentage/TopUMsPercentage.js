import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class TopUMsPercentage extends PureComponent {
  render() {
    const { list } = this.props;
    return (
      <div className="col-md-12">
        {list &&
          _.slice(list, 0, 16).map((agent, index) => {
            return (
              <div className="col-md-6 top-um-card" key={index}>
                <div className="col-md-2">{index + 1}.</div>
                <div className="col-md-2">{agent.agentura}</div>
                <div className="col-md-5">{agent.jmeno}</div>
                <div className="col-md-3">
                  {Number(agent.procento).toLocaleString("cs-CZ")} %
                </div>
              </div>
            );
          })}
        <div className="col-md-12">
          {list &&
            _.slice(list, 16).map((agent, index) => {
              return (
                <div className="col-md-3" key={index}>
                  {index + 1 + 16}. {agent.jmeno}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

TopUMsPercentage.propTypes = {
  // top70Production: PropTypes.Array.isRequired
};
