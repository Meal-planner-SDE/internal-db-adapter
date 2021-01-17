"use strict";
/*********
 * Main controller
 *   Here you can define all the processing logics of your endpoints.
 *   It's a good approach to keep in here only the elaboration of the inputs
 *   and outputs, with complex logics inside other functions to improve
 *   reusability and maintainability. In this case, we've defined the complex
 *   logics inside the core.ts file!
 *   In a huge project, you should have multiple controllers, divided
 *   by the domain of the operation.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.lineChart = exports.barChart = exports.ranking = exports.casesByRegionId = exports.regionById = exports.regions = exports.hello = void 0;
var types_1 = require("./types");
var core_1 = require("./core");
var helper_1 = require("./helper");
//#region --- EXAMPLE ---
var hello = function (req, res) {
    // If in the URL (GET request) e.g. localhost:8080/?name=pippo
    var name = req.query['name'];
    // If in body of the request (as json or form-data)
    // const name = req.body['name'];
    // If in the URL as a parameter e.g. localhost:8080/pippo/ and route defined as '/:name'
    // const name = req.params['name'];
    if (name != null && typeof name === 'string') {
        res.send(core_1.getHello(name));
    }
    else {
        res.status(400);
        res.send({ error: 'Invalid name format!' });
    }
};
exports.hello = hello;
//#endregion
//#region --- REGIONS and CASES ---
var regions = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, core_1.getRegions()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.regions = regions;
var regionById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = helper_1.getIdFromRequest(req);
                if (!(id !== false)) return [3 /*break*/, 2];
                _b = (_a = res).send;
                return [4 /*yield*/, core_1.getRegionById(id)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 3];
            case 2:
                res.status(400);
                res.send({ error: 'Invalid ID format!' });
                _c.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.regionById = regionById;
var casesByRegionId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, date, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = helper_1.getIdFromRequest(req);
                if (!(id !== false)) return [3 /*break*/, 2];
                date = helper_1.getDateFromRequest(req);
                _b = (_a = res).send;
                return [4 /*yield*/, core_1.getCasesByRegionId(id, date.year, date.month, date.day)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 3];
            case 2:
                res.status(400);
                res.send({ error: 'Invalid ID format!' });
                _c.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.casesByRegionId = casesByRegionId;
//#endregion
//#region --- LOCAL ELABORATIONS ---
var ranking = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var date, n, ord, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                date = helper_1.getDateFromRequest(req);
                n = helper_1.getNumberFromRequest(req, 'n');
                if (n === false) {
                    n = 5;
                }
                ord = req.query['ord'];
                if (ord !== 'asc') {
                    ord = 'desc';
                }
                _b = (_a = res).send;
                return [4 /*yield*/, core_1.getRanking(n, ord, date.year, date.month, date.day)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.ranking = ranking;
//#endregion
//#region --- CHARTS ---
var barChart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var date, chart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = helper_1.getDateFromRequest(req);
                return [4 /*yield*/, core_1.getBarChart(date.year, date.month, date.day)];
            case 1:
                chart = _a.sent();
                if (!types_1.isError(chart)) {
                    res.contentType('image/png');
                }
                res.send(chart);
                return [2 /*return*/];
        }
    });
}); };
exports.barChart = barChart;
var lineChart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, date, chart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = helper_1.getIdFromRequest(req);
                if (!(id !== false)) return [3 /*break*/, 2];
                date = helper_1.getDateFromRequest(req);
                return [4 /*yield*/, core_1.getLineChart(id, date.year, date.month)];
            case 1:
                chart = _a.sent();
                if (!types_1.isError(chart)) {
                    res.contentType('image/png');
                }
                res.send(chart);
                return [3 /*break*/, 3];
            case 2:
                res.status(400);
                res.send({ error: 'Invalid ID format!' });
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.lineChart = lineChart;
//#endregion
var users = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _b = (_a = res).send;
                return [4 /*yield*/, core_1.getUsers()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
exports.users = users;
