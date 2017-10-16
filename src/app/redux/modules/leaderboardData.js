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
        top70Production: action.top70Production
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
      )
    });
    dispatch(history.push("/zebricek"));
  };
}
