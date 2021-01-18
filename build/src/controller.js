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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userByUsername = exports.users = exports.lineChart = exports.barChart = exports.ranking = exports.casesByRegionId = exports.regionById = exports.regions = exports.hello = void 0;
const types_1 = require("./types");
const core_1 = require("./core");
const helper_1 = require("./helper");
//#region --- EXAMPLE ---
const hello = (req, res) => {
    // If in the URL (GET request) e.g. localhost:8080/?name=pippo
    const name = req.query['name'];
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
const regions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield core_1.getRegions());
});
exports.regions = regions;
const regionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    if (id !== false) {
        res.send(yield core_1.getRegionById(id));
    }
    else {
        res.status(400);
        res.send({ error: 'Invalid ID format!' });
    }
});
exports.regionById = regionById;
const casesByRegionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    if (id !== false) {
        const date = helper_1.getDateFromRequest(req);
        res.send(yield core_1.getCasesByRegionId(id, date.year, date.month, date.day));
    }
    else {
        res.status(400);
        res.send({ error: 'Invalid ID format!' });
    }
});
exports.casesByRegionId = casesByRegionId;
//#endregion
//#region --- LOCAL ELABORATIONS ---
const ranking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = helper_1.getDateFromRequest(req);
    let n = helper_1.getNumberFromRequest(req, 'n');
    if (n === false) {
        n = 5;
    }
    let ord = req.query['ord'];
    if (ord !== 'asc') {
        ord = 'desc';
    }
    res.send(yield core_1.getRanking(n, ord, date.year, date.month, date.day));
});
exports.ranking = ranking;
//#endregion
//#region --- CHARTS ---
const barChart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = helper_1.getDateFromRequest(req);
    const chart = yield core_1.getBarChart(date.year, date.month, date.day);
    if (!types_1.isError(chart)) {
        res.contentType('image/png');
    }
    res.send(chart);
});
exports.barChart = barChart;
const lineChart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    if (id !== false) {
        const date = helper_1.getDateFromRequest(req);
        const chart = yield core_1.getLineChart(id, date.year, date.month);
        if (!types_1.isError(chart)) {
            res.contentType('image/png');
        }
        res.send(chart);
    }
    else {
        res.status(400);
        res.send({ error: 'Invalid ID format!' });
    }
});
exports.lineChart = lineChart;
//#endregion
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield core_1.getUsers());
});
exports.users = users;
const userByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield core_1.getUserByUsername(req.params.username));
});
exports.userByUsername = userByUsername;
