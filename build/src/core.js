"use strict";
/*********
 * Core functionalities
 *   All the processing logics are defined here. In this way, we leave in the
 *   controller all the input/output filtering and selection, and here we write
 *   the "raw" logics. In this way they're also re-usable! :)
 *   Obviously, in a real project, those functionalities should be divided as well.
 *   "Core" is not a fixed word for this type of file, sometimes
 *   people put those functions in a Utils file, sometimes in a Helper
 *   file, sometimes in a Services folder with different files for every service..
 *   It really depends on your project, style and personal preference :)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByUsername = exports.getUsers = exports.getLineChart = exports.getBarChart = exports.getRanking = exports.getCasesByRegionId = exports.getRegionById = exports.getRegions = exports.getHello = void 0;
const types_1 = require("./types");
const dbUtils_1 = require("./dbUtils");
const config_1 = __importDefault(require("../config"));
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
// import secrets from '../secrets';
axios_1.default.defaults.paramsSerializer = (params) => {
    return qs_1.default.stringify(params, { indices: false });
};
//#region --- EXAMPLE ---
const getHello = (name) => {
    return {
        text: `Hello ${name}`,
    };
};
exports.getHello = getHello;
//#endregion
//#region --- REGIONS and CASES ---
const getRegions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regions = yield axios_1.default.get(`${config_1.default.URL_API_DATA}/regions`);
        return regions.data;
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.getRegions = getRegions;
const getRegionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const region = yield axios_1.default.get(`${config_1.default.URL_API_DATA}/region/${id}`);
        return region.data;
    }
    catch (e) {
        console.error(e);
        return {
            error: e,
        };
    }
});
exports.getRegionById = getRegionById;
const getCasesByRegionId = (id, year, month, day) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cases = yield axios_1.default.get(`${config_1.default.URL_API_DATA}/region/${id}/cases/${year}/${month}/${day}`);
        return cases.data;
    }
    catch (e) {
        console.error(e);
        return {
            error: e,
        };
    }
});
exports.getCasesByRegionId = getCasesByRegionId;
//#endregion
//#region --- LOCAL ELABORATIONS ---
const getRanking = (n, ord, year, month, day) => __awaiter(void 0, void 0, void 0, function* () {
    const regions = yield exports.getRegions();
    let ranks = [];
    if (!types_1.isError(regions)) {
        for (let i = 0; i < regions.length; i++) {
            const cases = yield exports.getCasesByRegionId(regions[i].id, year, month, day);
            if (!types_1.isError(cases)) {
                ranks.push({
                    region: regions[i],
                    cases: cases.total_positive,
                });
            }
        }
    }
    ranks = ranks.sort((a, b) => b.cases - a.cases);
    if (ord === 'asc') {
        ranks = ranks.reverse();
    }
    return ranks.slice(0, n);
});
exports.getRanking = getRanking;
//#endregion
//#region --- CHARTS ---
const getBarChart = (year, month, day) => __awaiter(void 0, void 0, void 0, function* () {
    const regions = yield exports.getRegions();
    if (!types_1.isError(regions)) {
        let labels = '';
        let data = '';
        let maxCases = 10000;
        // For each region, take the total number of positives and create the parameters query
        for (let i = 0; i < regions.length; i++) {
            const cases = yield exports.getCasesByRegionId(regions[i].id, year, month, day);
            if (!types_1.isError(cases)) {
                labels += regions[i].name.replace('P.A. ', '').slice(0, 4) + '.|';
                data += cases.total_positive + ',';
                if (cases.total_positive > maxCases) {
                    maxCases = cases.total_positive;
                }
            }
        }
        // remove trailing comma and pipe
        if (labels.length > 0) {
            labels = labels.slice(0, -1);
        }
        if (data.length > 0) {
            data = data.slice(0, -1);
        }
        // Let's make the request to google chart API to create the chart
        try {
            const response = yield axios_1.default.get('https://chart.googleapis.com/chart', {
                responseType: 'arraybuffer',
                params: {
                    cht: 'bvg',
                    chs: `700x250`,
                    chtt: 'Covid Infections',
                    chds: `0,${maxCases}`,
                    chd: `t:${data}`,
                    chco: '118ab2',
                    chl: `${labels}`,
                    chxt: 'x,y',
                    chxr: `1,0,${maxCases}`,
                },
            });
            return response.data;
        }
        catch (e) {
            console.error(e);
            return {
                error: e,
            };
        }
    }
    else {
        return regions; // It's an error! :( We return it as is.
    }
});
exports.getBarChart = getBarChart;
const getLineChart = (id, year, month) => __awaiter(void 0, void 0, void 0, function* () {
    const region = yield exports.getRegionById(id);
    if (!types_1.isError(region)) {
        let labels = '';
        let data = '';
        let maxCases = 10000;
        // Get cases for each day of the month
        for (let i = 1; i <= 31; i++) {
            const cases = yield exports.getCasesByRegionId(region.id, year, month, i);
            // If the day does not exists, it will be an error,
            // so even if we're trying to get 31th of February,
            // it will not be added to the labels and data!
            if (!types_1.isError(cases)) {
                labels += i + '|';
                data += cases.total_positive + ',';
                if (cases.total_positive > maxCases) {
                    maxCases = cases.total_positive;
                }
            }
        }
        // remove trailing comma and pipe
        if (labels.length > 0) {
            labels = labels.slice(0, -1);
        }
        if (data.length > 0) {
            data = data.slice(0, -1);
        }
        // Let's make the request to google chart API to create the chart
        try {
            const response = yield axios_1.default.get('https://chart.googleapis.com/chart', {
                responseType: 'arraybuffer',
                params: {
                    cht: 'lc',
                    chs: `600x250`,
                    chtt: 'Covid Infections',
                    chds: `0,${maxCases}`,
                    chd: `t:${data}`,
                    chdl: region.name,
                    chco: '118ab2',
                    chl: `${labels}`,
                    chxt: 'x,y',
                    chxr: `1,0,${maxCases}`,
                },
            });
            return response.data;
        }
        catch (e) {
            console.error(e);
            return {
                error: e,
            };
        }
    }
    else {
        return region; // It's an error! :( We return it as is.
    }
});
exports.getLineChart = getLineChart;
//#endregion
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return dbUtils_1.queryDB('SELECT * FROM MP_USER;').then((users) => {
            return users;
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.getUsers = getUsers;
const getUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return dbUtils_1.queryDB(`SELECT * FROM MP_USER WHERE username = '${username}';`).then((users) => {
            return users[0];
        });
    }
    catch (e) {
        console.error(e);
        return {
            error: e.toString(),
        };
    }
});
exports.getUserByUsername = getUserByUsername;
