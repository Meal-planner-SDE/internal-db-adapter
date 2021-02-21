"use strict";
/*********
 * Helper
 *   Here you can define all those functions that can be
 *   useful in several places but does not belong to any
 *   of the other files.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdFromRequest = exports.parseNumber = exports.getNumberFromRequest = void 0;
/**
 * Extract a specific parameter from the query-string
 * @param req The request (as given in the controller)
 * @param param The id of the parameter to be extracted
 * @return the value of the parameter if the parameter is
 * correct and available, false otherwise
 */
const getNumberFromRequest = (req, param) => {
    let value = req.query[param];
    if (typeof value !== 'string') {
        return NaN;
    }
    try {
        return parseInt(value);
    }
    catch (e) {
        console.error(`Error extracting parameter ${param}:`, e);
        return NaN;
    }
};
exports.getNumberFromRequest = getNumberFromRequest;
const parseNumber = (param) => {
    if (typeof param !== 'string') {
        return NaN;
    }
    try {
        return parseInt(param);
    }
    catch (e) {
        return NaN;
    }
};
exports.parseNumber = parseNumber;
/**
 * Extract id from the request query-string
 * @param req The request (as given in the controller)
 * @return the id if the parameter is correct and
 * available, false otherwise
 */
const getIdFromRequest = (req, id_name) => {
    return exports.parseNumber(req.params[id_name || "id"]);
};
exports.getIdFromRequest = getIdFromRequest;
