import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class Top10Meetings extends PureComponent {
  render() {
    const { list } = this.props;
    return (
      <div className="col-md-12">
        <div className="col-md-8">
          <div className="col-md-12 top-3-in-meetings">
            <div className="col-md-4">[obrázek TV]</div>
            <div className="col-md-8">
              1. {_.get(_.nth(_.get(this.props, "list"), 0), "jmeno")}
            </div>
          </div>
          <div className="col-md-12 top-3-in-meetings">
            <div className="col-md-4">[obrázek tabletu]</div>
            <div className="col-md-8">
              2. {_.get(_.nth(_.get(this.props, "list"), 1), "jmeno")}
            </div>{" "}
          </div>
          <div className="col-md-12 top-3-in-meetings">
            <div className="col-md-4">[obrázek tabletu]</div>
            <div className="col-md-8">
              3. {_.get(_.nth(_.get(this.props, "list"), 2), "jmeno")}
            </div>{" "}
          </div>
        </div>
        <div className="col-md-4">
          <ol start="4">
            {_.slice(_.get(this.props, "list"), 3).map((agent, index) => {
              return <li key={index}>{agent.jmeno}</li>;
            })}
          </ol>
        </div>
      </div>
    );
  }
}

Top10Meetings.propTypes = {
  // top70Production: PropTypes.Array.isRequired
};
