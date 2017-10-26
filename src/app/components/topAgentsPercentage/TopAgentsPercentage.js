import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { AgencyLabel } from "../../components";
import _ from "lodash";
import "./TopAgentsPercentage.scss";

export default class TopAgentsPercentage extends PureComponent {
  render() {
    const { list } = this.props;
    return (
      <div className="col-md-12">
        <h2 className="">Žebříček poradců podle úspěšnosti na schůzkách</h2>
        {_.chunk(
          _.slice(list, 0, 16),
          _.ceil(_.size(_.slice(list, 0, 16)) / 2)
        ).map((column, columnIndex) => {
          return (
            <div className="col-md-6">
              {column.map((agent, index) => {
                return (
                  <div className="top-agent-card clearfix" key={index}>
                    <div className="col-md-1">
                      <strong>
                        {index +
                          1 +
                          columnIndex *
                            _.ceil(_.size(_.slice(list, 0, 16)) / 2)}.
                      </strong>
                    </div>
                    <div className="col-md-1">
                      <AgencyLabel data={agent.agentura} />
                    </div>
                    <div className="col-md-5">
                      {agent.jmeno}
                      <br />
                      <span className="um-name">UM: {agent.UM}</span>
                    </div>
                    <div className="col-md-3 text-right">
                      <strong>{agent.procento}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="col-md-12 all-um-container">
          {_.chunk(
            _.slice(list, 16),
            _.ceil(_.size(_.slice(list, 16)) / 4)
          ).map((column, columnIndex) => {
            return (
              <div className="col-md-3" key={columnIndex}>
                {column.map((agent, index) => {
                  return (
                    <div>
                      {" "}
                      <strong>
                        {index +
                          1 +
                          16 +
                          columnIndex * _.ceil(_.size(_.slice(list, 16)) / 4)}.
                      </strong>{" "}
                      <span className="um-name">{agent.procento}</span>{" "}
                      {agent.jmeno}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

TopAgentsPercentage.propTypes = {
  // top70Production: PropTypes.Array.isRequired
};
