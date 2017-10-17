import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { AgencyLabel } from "../../components";
import _ from "lodash";
import "./topUMsPercentage.scss";

export default class TopUMsPercentage extends PureComponent {
  render() {
    const { list } = this.props;
    return (
      <div className="col-md-12">
        <h2 className="">Žebříček UM podle zachráněných prostředků</h2>
        {list &&
          _.slice(list, 0, 16).map((agent, index) => {
            return (
              <div className="col-md-6 top-um-card" key={index}>
                <div className="col-md-1">
                  <strong>{index + 1}.</strong>
                </div>
                <div className="col-md-1">
                  <AgencyLabel data={agent.agentura} />
                </div>
                <div className="col-md-5">{agent.jmeno}</div>
                <div className="col-md-3">
                  <strong>
                    {Number(agent.procento).toLocaleString("cs-CZ")} %
                  </strong>
                </div>
              </div>
            );
          })}
        <div className="col-md-12 all-um-container">
          {list &&
            _.slice(list, 16).map((agent, index) => {
              return (
                <div className="col-md-3" key={index}>
                  <strong>{index + 1 + 16}.</strong> {agent.jmeno}
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
