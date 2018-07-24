import _ from "lodash";
import { func } from "prop-types";
import * as XLSX from "xlsx";

const PARSE_DATA = "PARSE_DATA";
const RESET_DATA = "RESET_DATA";

const initialState = {
  top70Production: [],
  top10Meetings: [],
  topUMsPercentage: [],
  topAgentsPercentage: [],
  timeline: [],
  topAgencies: [],
  dataLoaded: false
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
        timeline: action.timeline,
        dataLoaded: true
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
          _.slice(_.tail(_.split(form.top70Production, "\n")), 0, 30),
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

export function parseXLSX(file, history) {
  return dispatch => {
    const reader = new FileReader();
    reader.onload = () => {
      const wb = XLSX.read(reader.result, { type: "binary" });

      const agentury = _.filter(
        XLSX.utils.sheet_to_json(wb.Sheets["Agentury"], {
          range: 3
        }),
        row => {
          return _.size(row) > 0;
        }
      );

      const unityDetail = _.filter(
        XLSX.utils.sheet_to_json(wb.Sheets["Unity_detail"], {
          range: 2
        }),
        row => {
          return _.size(row) > 0;
        }
      );

      const poradciDetail = _.filter(
        XLSX.utils.sheet_to_json(wb.Sheets["Poradci_detail2"], {
          range: 2
        }),
        row => {
          return _.size(row) > 0;
        }
      );

      const topAgencies = agentury
        .filter(row => row.AGENTURNI_REDITEL !== "TOTAL")
        .map(
          row =>
            new Object({
              ...row,
              Uspesnost_kontaktu:
                new Number(row.Pocet_LIVE) *
                100 /
                new Number(row.Pocet_kontaktu)
            })
        )
        .sort((a, b) => (a.Uspesnost_kontaktu < b.Uspesnost_kontaktu ? 1 : -1))
        .map(
          row =>
            new Object({
              agentura: row.AGENTURNI_REDITEL.substring(0, 2),
              jmeno: row.AGENTURNI_REDITEL,
              procento:
                row.Uspesnost_kontaktu.toLocaleString("cs-CZ", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) + " %"
            })
        );

      const topUMsPercentage = unityDetail
        .filter(row => row.UNIT_MANAGER.length > 3)
        .map(
          row =>
            new Object({
              ...row,
              Uspesnost_kontaktu:
                new Number(row.Pocet_LIVE) *
                100 /
                new Number(row.Pocet_kontaktu)
            })
        )
        .sort((a, b) => (a.Uspesnost_kontaktu < b.Uspesnost_kontaktu ? 1 : -1))
        .map(
          row =>
            new Object({
              agentura: row.AGENTURNI_REDITEL.substring(0, 2),
              jmeno: row.UNIT_MANAGER,
              procento:
                row.Uspesnost_kontaktu.toLocaleString("cs-CZ", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) + " %"
            })
        );

      const topAgentsPercentage = poradciDetail
        .filter(row => row.Stav != "Neaktivní")
        .map(
          row =>
            new Object({
              ...row,
              Uspesnost_kontaktu:
                new Number(row.Pocet_LIVE) *
                100 /
                new Number(row.Pocet_kontaktu)
            })
        )
        .sort((a, b) => (a.Uspesnost_kontaktu < b.Uspesnost_kontaktu ? 1 : -1))
        .map(
          row =>
            new Object({
              agentura: row.AGENTURNI_REDITEL.substring(0, 2),
              UM: row.UNIT_MANAGER,
              jmeno: row.PORADCE,
              procento:
                row.Uspesnost_kontaktu.toLocaleString("cs-CZ", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) + " %"
            })
        );

      const top70Production = poradciDetail
        .filter(row => row.Stav != "Neaktivní")
        .map(
          row =>
            new Object({
              ...row,
              Uspesnost_kontaktu:
                new Number(row.Navstiveno) > 0
                  ? new Number(row.Pocet_LIVE) *
                    100 /
                    new Number(row.Navstiveno)
                  : 0
            })
        )
        .sort((a, b) => (a.Uspesnost_kontaktu < b.Uspesnost_kontaktu ? 1 : -1))
        .map(
          row =>
            new Object({
              agentura: row.AGENTURNI_REDITEL.substring(0, 2),
              UM: row.UNIT_MANAGER,
              jmeno: row.PORADCE,
              procento:
                row.Uspesnost_kontaktu.toLocaleString("cs-CZ", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }) + " %"
            })
        )
        .slice(0, 70);

      const timeline = poradciDetail
        .filter(row => row.Stav != "Neaktivní")
        .map(
          row =>
            new Object({
              ...row,
              Ape: new Number(row.Ape.replace(/[^0-9$.]/g, ""))
            })
        )
        .sort((a, b) => (a.Ape < b.Ape ? 1 : -1))
        .slice(0, 10)
        .map(
          row =>
            new Object({
              agentura: row.AGENTURNI_REDITEL.substring(0, 2),
              UM: row.UNIT_MANAGER,
              jmeno: row.PORADCE,
              produkce: row.Ape
            })
        );

      dispatch({
        type: PARSE_DATA,
        topAgencies: topAgencies,
        topUMsPercentage: topUMsPercentage,
        topAgentsPercentage: topAgentsPercentage,
        top70Production: top70Production,
        timeline: timeline
      });

      history.push("/zebricek");
    };
    reader.readAsBinaryString(file);
  };
}

export function resetData() {
  return dispatch => {
    dispatch({ type: RESET_DATA });
  };
}
