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
        <h2 className="">
          Top 10 UM podle úspěšnosti týmu ze schůzek sjednaných call centrem
        </h2>
        {_
          .chunk(_.slice(list, 0, 20), _.ceil(_.size(_.slice(list, 0, 20)) / 2))
          .map((column, columnIndex) => {
            return (
              <div className="col-md-6" key={columnIndex}>
                {column.map((agent, index) => {
                  return (
                    <div
                      className="top-um-card clearfix"
                      key={columnIndex + "-" + index}
                    >
                      <div className="col-md-1">
                        <strong>
                          {index +
                            1 +
                            columnIndex *
                              _.ceil(_.size(_.slice(list, 0, 20)) / 2)}.
                        </strong>
                      </div>
                      <div className="col-md-1">
                        <AgencyLabel data={agent.agentura} />
                      </div>
                      <div className="col-md-5">{agent.jmeno}</div>
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
          {_
            .chunk(_.slice(list, 20), _.ceil(_.size(_.slice(list, 20)) / 4))
            .map((column, columnIndex) => {
              return (
                <div className="col-md-3" key={columnIndex}>
                  {column.map((agent, index) => {
                    return (
                      <div key={index}>
                        {" "}
                        <strong>
                          {index +
                            1 +
                            16 +
                            columnIndex *
                              _.ceil(_.size(_.slice(list, 20)) / 4)}.
                        </strong>{" "}
                        {agent.jmeno}{" "}
                        <span className="um-name">{agent.procento}</span>
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

TopUMsPercentage.propTypes = {
  // top70Production: PropTypes.Array.isRequired
};
