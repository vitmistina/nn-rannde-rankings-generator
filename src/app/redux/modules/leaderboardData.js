import _ from "lodash";

const PARSE_DATA = "PARSE_DATA";
const RESET_DATA = "RESET_DATA";

const initialState = {
  top70Production: [],
  top10Meetings: [],
  topUMsPercentage: [],
  timeline: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PARSE_DATA:
      return Object.assign({}, state, {
        top70Production: action.top70Production,
        top10Meetings: action.top10Meetings,
        topUMsPercentage: action.topUMsPercentage,
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
      top70Production: _.map(
        _.tail(_.split(form.top70Production, "\n")),
        row => {
          const parsedRow = _.split(row, "\t");
          return {
            posun: _.nth(parsedRow, 0),
            agentura: _.nth(parsedRow, 1),
            jmeno: _.nth(parsedRow, 2),
            produkce: _.nth(parsedRow, 3)
          };
        }
      ),
      top10Meetings: _.map(
        _.tail(_.split(form.top10Meetings, "\n")),
        row => {
          return {
            jmeno: row
          };
        }
      ),
      topUMsPercentage: _.map(
        _.tail(_.split(form.topUMsPercentage, "\n")),
        row => {
          const parsedRow = _.split(row, "\t");
          return {
            jmeno: _.nth(parsedRow, 0),
            posun: _.nth(parsedRow, 1),
            agentura: _.nth(parsedRow, 2),
            procento: _.nth(parsedRow, 3)
          };
        }
      ),
      timeline: _.map(
        _.tail(_.split(form.timeline, "\n")),
        row => {
          const parsedRow = _.split(row, "\t");
          return {
            datum: _.nth(parsedRow, 0),
            produkce: _.nth(parsedRow, 1),
          };
        }
      )
    });
    dispatch(history.push("/zebricek"));
  };
}
