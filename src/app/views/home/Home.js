// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Control, Form, Errors, actions } from "react-redux-form";

class Home extends Component {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="well">
          <h2>Zadání informací</h2>
          <Form
            model="formData.input"
            onSubmit={formValues => {
              this.props.parseData(formValues, this.props.history);
            }}
            className="form-horizontal"
          >
            <div className="form-group">
              <label htmlFor=".topAgencies" className="form-label">
                Žebříček UM:
              </label>
              <Control.textarea
                model=".topAgencies"
                required
                id="topAgencies"
                validateOn={["blur"]}
                className="form-control"
                rows="2"
              />
              <Errors
                className="has-error"
                component={props => (
                  <span className="help-block">{props.children}</span>
                )}
                model=".topAgencies"
                messages={{
                  valueMissing: "Tato položka je povinná"
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor=".timeline" className="form-label">
                Časová řada:
              </label>
              <Control.textarea
                model=".timeline"
                id="timeline"
                validateOn={["blur"]}
                className="form-control"
                rows="2"
              />
              <Errors
                className="has-error"
                component={props => (
                  <span className="help-block">{props.children}</span>
                )}
                model=".timeline"
                messages={{
                  valueMissing: "Tato položka je povinná"
                }}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn--primary btn--lg">
                Vygenerovat
              </button>
            </div>
          </Form>
        </div>
        <pre>{JSON.stringify(this.props.inputData, null, 2)}</pre>
        <pre>{JSON.stringify(this.props.leaderboardData, null, 2)}</pre>
      </div>
    );
  }
}

export default Home;
