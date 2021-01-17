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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getLineChart = exports.getBarChart = exports.getRanking = exports.getCasesByRegionId = exports.getRegionById = exports.getRegions = exports.getHello = void 0;
var types_1 = require("./types");
var config_1 = __importDefault(require("../config"));
var qs_1 = __importDefault(require("qs"));
var axios_1 = __importDefault(require("axios"));
// import secrets from '../secrets';
axios_1.default.defaults.paramsSerializer = function (params) {
    return qs_1.default.stringify(params, { indices: false });
};
//#region --- EXAMPLE ---
var getHello = function (name) {
    return {
        text: "Hello " + name,
    };
};
exports.getHello = getHello;
//#endregion
//#region --- REGIONS and CASES ---
var getRegions = function () { return __awaiter(void 0, void 0, void 0, function () {
    var regions, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get(config_1.default.URL_API_DATA + "/regions")];
            case 1:
                regions = _a.sent();
                return [2 /*return*/, regions.data];
            case 2:
                e_1 = _a.sent();
                console.error(e_1);
                return [2 /*return*/, {
                        error: e_1.toString(),
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRegions = getRegions;
var getRegionById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var region, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get(config_1.default.URL_API_DATA + "/region/" + id)];
            case 1:
                region = _a.sent();
                return [2 /*return*/, region.data];
            case 2:
                e_2 = _a.sent();
                console.error(e_2);
                return [2 /*return*/, {
                        error: e_2,
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRegionById = getRegionById;
var getCasesByRegionId = function (id, year, month, day) { return __awaiter(void 0, void 0, void 0, function () {
    var cases, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.get(config_1.default.URL_API_DATA + "/region/" + id + "/cases/" + year + "/" + month + "/" + day)];
            case 1:
                cases = _a.sent();
                return [2 /*return*/, cases.data];
            case 2:
                e_3 = _a.sent();
                console.error(e_3);
                return [2 /*return*/, {
                        error: e_3,
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCasesByRegionId = getCasesByRegionId;
//#endregion
//#region --- LOCAL ELABORATIONS ---
var getRanking = function (n, ord, year, month, day) { return __awaiter(void 0, void 0, void 0, function () {
    var regions, ranks, i, cases;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getRegions()];
            case 1:
                regions = _a.sent();
                ranks = [];
                if (!!types_1.isError(regions)) return [3 /*break*/, 5];
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < regions.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, exports.getCasesByRegionId(regions[i].id, year, month, day)];
            case 3:
                cases = _a.sent();
                if (!types_1.isError(cases)) {
                    ranks.push({
                        region: regions[i],
                        cases: cases.total_positive,
                    });
                }
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                ranks = ranks.sort(function (a, b) { return b.cases - a.cases; });
                if (ord === 'asc') {
                    ranks = ranks.reverse();
                }
                return [2 /*return*/, ranks.slice(0, n)];
        }
    });
}); };
exports.getRanking = getRanking;
//#endregion
//#region --- CHARTS ---
var getBarChart = function (year, month, day) { return __awaiter(void 0, void 0, void 0, function () {
    var regions, labels, data, maxCases, i, cases, response, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getRegions()];
            case 1:
                regions = _a.sent();
                if (!!types_1.isError(regions)) return [3 /*break*/, 10];
                labels = '';
                data = '';
                maxCases = 10000;
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < regions.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, exports.getCasesByRegionId(regions[i].id, year, month, day)];
            case 3:
                cases = _a.sent();
                if (!types_1.isError(cases)) {
                    labels += regions[i].name.replace('P.A. ', '').slice(0, 4) + '.|';
                    data += cases.total_positive + ',';
                    if (cases.total_positive > maxCases) {
                        maxCases = cases.total_positive;
                    }
                }
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                // remove trailing comma and pipe
                if (labels.length > 0) {
                    labels = labels.slice(0, -1);
                }
                if (data.length > 0) {
                    data = data.slice(0, -1);
                }
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, axios_1.default.get('https://chart.googleapis.com/chart', {
                        responseType: 'arraybuffer',
                        params: {
                            cht: 'bvg',
                            chs: "700x250",
                            chtt: 'Covid Infections',
                            chds: "0," + maxCases,
                            chd: "t:" + data,
                            chco: '118ab2',
                            chl: "" + labels,
                            chxt: 'x,y',
                            chxr: "1,0," + maxCases,
                        },
                    })];
            case 7:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 8:
                e_4 = _a.sent();
                console.error(e_4);
                return [2 /*return*/, {
                        error: e_4,
                    }];
            case 9: return [3 /*break*/, 11];
            case 10: return [2 /*return*/, regions]; // It's an error! :( We return it as is.
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.getBarChart = getBarChart;
var getLineChart = function (id, year, month) { return __awaiter(void 0, void 0, void 0, function () {
    var region, labels, data, maxCases, i, cases, response, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getRegionById(id)];
            case 1:
                region = _a.sent();
                if (!!types_1.isError(region)) return [3 /*break*/, 10];
                labels = '';
                data = '';
                maxCases = 10000;
                i = 1;
                _a.label = 2;
            case 2:
                if (!(i <= 31)) return [3 /*break*/, 5];
                return [4 /*yield*/, exports.getCasesByRegionId(region.id, year, month, i)];
            case 3:
                cases = _a.sent();
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
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5:
                // remove trailing comma and pipe
                if (labels.length > 0) {
                    labels = labels.slice(0, -1);
                }
                if (data.length > 0) {
                    data = data.slice(0, -1);
                }
                _a.label = 6;
            case 6:
                _a.trys.push([6, 8, , 9]);
                return [4 /*yield*/, axios_1.default.get('https://chart.googleapis.com/chart', {
                        responseType: 'arraybuffer',
                        params: {
                            cht: 'lc',
                            chs: "600x250",
                            chtt: 'Covid Infections',
                            chds: "0," + maxCases,
                            chd: "t:" + data,
                            chdl: region.name,
                            chco: '118ab2',
                            chl: "" + labels,
                            chxt: 'x,y',
                            chxr: "1,0," + maxCases,
                        },
                    })];
            case 7:
                response = _a.sent();
                return [2 /*return*/, response.data];
            case 8:
                e_5 = _a.sent();
                console.error(e_5);
                return [2 /*return*/, {
                        error: e_5,
                    }];
            case 9: return [3 /*break*/, 11];
            case 10: return [2 /*return*/, region]; // It's an error! :( We return it as is.
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.getLineChart = getLineChart;
//#endregion
var getUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var Client, client_1;
    return __generator(this, function (_a) {
        try {
            Client = require('pg').Client;
            client_1 = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });
            client_1.connect();
            client_1.query('SELECT username FROM MP_USERS;', function (err, res) {
                if (err)
                    throw err;
                for (var _i = 0, _a = res.rows; _i < _a.length; _i++) {
                    var row = _a[_i];
                    console.log(JSON.stringify(row));
                }
                client_1.end();
            });
            // const users = await axios.get<Region[]>(`${config.URL_API_DATA}/regions`);
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    resolve([]);
                })];
        }
        catch (e) {
            console.error(e);
            return [2 /*return*/, {
                    error: e.toString(),
                }];
        }
        return [2 /*return*/];
    });
}); };
exports.getUsers = getUsers;
