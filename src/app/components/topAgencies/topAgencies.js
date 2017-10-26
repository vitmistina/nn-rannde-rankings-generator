import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { AgencyLabel } from "../../components";
import _ from "lodash";
import "./topAgencies.scss";

export default class TopAgencies extends PureComponent {
  render() {
    const { list } = this.props;
    return (
      <div className="col-md-12">
        <h2 className="">
          Žebříček poboček podle úspěšnosti sjednaných schůzek
        </h2>
        {_.chunk(
          _.slice(list, 0, 10),
          _.ceil(_.size(_.slice(list, 0, 10)) / 2)
        ).map((column, columnIndex) => {
          return (
            <div className="col-md-6" key={columnIndex}>
              {column.map((agent, index) => {
                return (
                  <div
                    className="top-um-card"
                    key={(index + 1) * (columnIndex + 1)}
                  >
                    <div className="col-md-1">
                      <strong>
                        {index +
                          1 +
                          columnIndex *
                            _.ceil(_.size(_.slice(list, 0, 10)) / 2)}.
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
      </div>
    );
  }
}

TopAgencies.propTypes = {
  // top70Production: PropTypes.Array.isRequired
};
