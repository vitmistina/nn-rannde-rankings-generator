import React, { PureComponent } from "react";
import { AgencyLabel } from "../../components";
import PropTypes from "prop-types";
import _ from "lodash";

export default class Top70Production extends PureComponent {
  render() {
    const { top70Production } = this.props;
    return (
      <div>
        <h2 className="">Soutěž od 70 CCS karet</h2>
        <div className="col-md-4">
          <table className="table table-responsive table--stripped">
            <thead>
              <tr>
                <th>#</th>
                <th>Agentura</th>
                <th>Jméno</th>
                <th>Výsledek</th>
              </tr>
            </thead>
            <tbody>
              {_.get(this.props, "top70Production") &&
                _.get(this.props, "top70Production").map((agent, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <AgencyLabel data={agent.agentura} />
                      </td>
                      <td>{agent.jmeno}</td>
                      <td>
                        {Number(agent.produkce).toLocaleString("cs-CZ")} Kč
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Top70Production.propTypes = {
  // top70Production: PropTypes.Array.isRequired
};
