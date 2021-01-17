"use strict";
/*********
 * Helper
 *   Here you can define all those functions that can be
 *   useful in several places but does not belong to any
 *   of the other files.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentDate = exports.getDateFromRequest = exports.getIdFromRequest = exports.getNumberFromRequest = void 0;
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
        return false;
    }
    try {
        return parseInt(value);
    }
    catch (e) {
        console.error(`Error extracting parameter ${param}:`, e);
        return false;
    }
};
exports.getNumberFromRequest = getNumberFromRequest;
/**
 * Extract id from the request query-string
 * @param req The request (as given in the controller)
 * @return the id if the parameter is correct and
 * available, false otherwise
 */
const getIdFromRequest = (req) => {
    return exports.getNumberFromRequest(req, 'id');
};
exports.getIdFromRequest = getIdFromRequest;
/**
 * Extract day, month and year from the request query-string
 * @param req The request (as given in the controller)
 * @return an object containing day, month and year parameters
 * if the parameter for the day/month/year is not available,
 * the current day/month/year will be used
 */
const getDateFromRequest = (req) => {
    let day = exports.getNumberFromRequest(req, 'd');
    let month = exports.getNumberFromRequest(req, 'm');
    let year = exports.getNumberFromRequest(req, 'y');
    const currentDate = exports.getCurrentDate();
    if (day === false) {
        day = currentDate.day;
    }
    if (month === false) {
        month = currentDate.month;
    }
    if (year === false) {
        year = currentDate.year;
    }
    return {
        day: day,
        month: month,
        year: year,
    };
};
exports.getDateFromRequest = getDateFromRequest;
/**
 * Returns the current day
 * @return an object containing day, month and years parameters
 * representing the current date (today)
 */
const getCurrentDate = () => {
    const date = new Date();
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
    };
};
exports.getCurrentDate = getCurrentDate;
