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
exports.deleteUserMealPlan = exports.postUserMealPlan = exports.userMealPlanById = exports.userMealPlans = exports.patchUserShoppingListEntries = exports.userShoppingListEntries = exports.deleteUserRecipe = exports.postUserRecipes = exports.userRecipes = exports.patchUser = exports.postUser = exports.userByUsername = exports.users = void 0;
const core_1 = require("./core");
const helper_1 = require("./helper");
//#region --- EXAMPLE ---
// export const hello = (req: Request, res: Response) => {
//   // If in the URL (GET request) e.g. localhost:8080/?name=pippo
//   const name = req.query['name'];
//   // If in body of the request (as json or form-data)
//   // const name = req.body['name'];
//   // If in the URL as a parameter e.g. localhost:8080/pippo/ and route defined as '/:name'
//   // const name = req.params['name'];
//   if (name != null && typeof name === 'string') {
//     res.send(getHello(name));
//   } else {
//     res.status(400);
//     res.send({ error: 'Invalid name format!' });
//   }
// };
//#endregion
//#region --- REGIONS and CASES ---
// export const regions = async (req: Request, res: Response) => {
//   res.send(await getRegions());
// };
// export const regionById = async (req: Request, res: Response) => {
//   const id = getIdFromRequest(req);
//   if (id !== false) {
//     res.send(await getRegionById(id));
//   } else {
//     res.status(400);
//     res.send({ error: 'Invalid ID format!' });
//   }
// };
// export const casesByRegionId = async (req: Request, res: Response) => {
//   const id = getIdFromRequest(req);
//   if (id !== false) {
//     const date = getDateFromRequest(req);
//     res.send(await getCasesByRegionId(id, date.year, date.month, date.day));
//   } else {
//     res.status(400);
//     res.send({ error: 'Invalid ID format!' });
//   }
// };
//#endregion
//#region --- LOCAL ELABORATIONS ---
// export const ranking = async (req: Request, res: Response) => {
//   const date = getDateFromRequest(req);
//   let n = getNumberFromRequest(req, 'n');
//   if (n === false) {
//     n = 5;
//   }
//   let ord = req.query['ord'];
//   if (ord !== 'asc') {
//     ord = 'desc';
//   }
//   res.send(await getRanking(n, ord, date.year, date.month, date.day));
// };
//#endregion
//#region --- CHARTS ---
// export const barChart = async (req: Request, res: Response) => {
//   const date = getDateFromRequest(req);
//   const chart = await getBarChart(date.year, date.month, date.day);
//   if (!isError(chart)) {
//     res.contentType('image/png');
//   }
//   res.send(chart);
// };
// export const lineChart = async (req: Request, res: Response) => {
//   const id = getIdFromRequest(req);
//   if (id !== false) {
//     const date = getDateFromRequest(req);
//     const chart = await getLineChart(id, date.year, date.month);
//     if (!isError(chart)) {
//       res.contentType('image/png');
//     }
//     res.send(chart);
//   } else {
//     res.status(400);
//     res.send({ error: 'Invalid ID format!' });
//   }
// };
//#endregion
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield core_1.getUsers());
});
exports.users = users;
const userByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield core_1.getUserByUsername(req.params.username));
});
exports.userByUsername = userByUsername;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield core_1.insertUser(req.body));
});
exports.postUser = postUser;
const patchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    res.send(yield core_1.updateUser(id, req.body));
});
exports.patchUser = patchUser;
const userRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    res.send(yield core_1.getUserRecipes(id));
});
exports.userRecipes = userRecipes;
const postUserRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    res.send(yield core_1.insertUserRecipes(id, req.body));
});
exports.postUserRecipes = postUserRecipes;
const deleteUserRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    const rid = helper_1.getIdFromRequest(req, 'rid');
    res.send(yield core_1.removeUserRecipe(id, rid));
});
exports.deleteUserRecipe = deleteUserRecipe;
const userShoppingListEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    res.send(yield core_1.getUserShoppingListEntries(id));
});
exports.userShoppingListEntries = userShoppingListEntries;
const patchUserShoppingListEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    res.send(yield core_1.updateUserShoppingListEntries(id, req.body));
});
exports.patchUserShoppingListEntries = patchUserShoppingListEntries;
const userMealPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    res.send(yield core_1.getUserMealPlans(id));
});
exports.userMealPlans = userMealPlans;
const userMealPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    const mid = helper_1.getIdFromRequest(req, 'mid');
    res.send(yield core_1.getUserMealPlanById(id, mid));
});
exports.userMealPlanById = userMealPlanById;
const postUserMealPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    res.send(yield core_1.insertUserMealPlan(id, req.body));
});
exports.postUserMealPlan = postUserMealPlan;
const deleteUserMealPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    const mid = helper_1.getIdFromRequest(req, 'mid');
    res.send(yield core_1.removeUserMealPlan(id, mid));
});
exports.deleteUserMealPlan = deleteUserMealPlan;
