import _ from "lodash";

const PARSE_DATA = "PARSE_DATA";
const RESET_DATA = "RESET_DATA";

const initialState = {
  top70Production: [],
  top10Meetings: [],
  topUMsPercentage: [],
  topAgentsPercentage: [],
  timeline: [],
  topAgencies: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PARSE_DATA:
      return Object.assign({}, state, {
        top70Production: action.top70Production,
        top10Meetings: action.top10Meetings,
        topUMsPercentage: action.topUMsPercentage,
        topAgentsPercentage: action.topAgentsPercentage,
        topAgencies: action.topAgencies,
        timeline: action.timeline
      });
    case RESET_DATA:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

export function parseData(form, history) {
  return dispatch => {
    dispatch({
      type: PARSE_DATA,
      top70Production: _.compact(
        _.map(
          _.slice(_.tail(_.split(form.top70Production, "\n")), 0, 70),
          row => {
            if (_.size(row) > 0) {
              const parsedRow = _.split(row, "\t");
              return {
                posun: null,
                agentura: _.nth(parsedRow, 1).substring(0, 2),
                jmeno: _.nth(parsedRow, 3),
                produkce: _.nth(parsedRow, 4)
              };
            }
            return null;
          }
        )
      ),
      top10Meetings: _.compact(
        _.map(_.tail(_.split(form.top10Meetings, "\n")), row => {
          return {
            jmeno: row
          };
        })
      ),
      topUMsPercentage: _.compact(
        _.map(_.tail(_.split(form.topUMsPercentage, "\n")), row => {
          if (_.size(row) > 0) {
            const parsedRow = _.split(row, "\t");
            return {
              agentura: _.nth(parsedRow, 1).substring(0, 2),
              jmeno: _.nth(parsedRow, 3),
              procento: _.nth(parsedRow, 4)
            };
          }
          return null;
        })
      ),
      topAgencies: _.compact(
        _.map(_.tail(_.split(form.topAgencies, "\n")), row => {
          if (_.size(row) > 0) {
            const parsedRow = _.split(row, "\t");
            return {
              agentura: _.nth(parsedRow, 2).substring(0, 2),
              jmeno: _.nth(parsedRow, 2),
              procento: _.nth(parsedRow, 3)
            };
          }
          return null;
        })
      ),
      topAgentsPercentage: _.compact(
        _.map(_.tail(_.split(form.topAgentsPercentage, "\n")), row => {
          if (_.size(row) > 0) {
            const parsedRow = _.split(row, "\t");
            return {
              agentura: _.nth(parsedRow, 1).substring(0, 2),
              UM: _.nth(parsedRow, 3),
              jmeno: _.nth(parsedRow, 4),
              procento: _.nth(parsedRow, 5)
            };
          }
          return null;
        })
      ),
      timeline: _.compact(
        _.map(_.tail(_.split(form.timeline, "\n")), row => {
          if (_.size(row) > 0) {
            const parsedRow = _.split(row, "\t");
            return {
              produkce: _.nth(parsedRow, 0).replace(/\D/g, ""),
              jmeno: _.nth(parsedRow, 1)
            };
          }
          return null;
        })
      )
    });
    dispatch(history.push("/zebricek"));
  };
}
