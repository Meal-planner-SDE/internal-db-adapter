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
const types_1 = require("./types");
const core_1 = require("./core");
const helper_1 = require("./helper");
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield core_1.getUsers();
    if (types_1.isError(users)) {
        res.status(400);
    }
    res.send(users);
});
exports.users = users;
const userByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield core_1.getUserByUsername(req.params.username);
    if (types_1.isError(user)) {
        res.status(400);
    }
    res.send(user);
});
exports.userByUsername = userByUsername;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield core_1.insertUser(req.body);
    if (types_1.isError(user)) {
        res.status(400);
    }
    res.send(user);
});
exports.postUser = postUser;
const patchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    if (isNaN(id)) {
        res.status(400);
        res.send({ 'error': 'id should be an integer.' });
    }
    else {
        let user = yield core_1.updateUser(id, req.body);
        if (types_1.isError(user)) {
            res.status(400);
        }
        res.send(user);
    }
    ;
});
exports.patchUser = patchUser;
const userRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    if (isNaN(id)) {
        res.status(400);
        res.send({ 'error': 'id should be an integer.' });
    }
    else {
        let recipes = yield core_1.getUserRecipes(id);
        if (types_1.isError(recipes)) {
            res.status(400);
        }
        res.send(recipes);
    }
    ;
});
exports.userRecipes = userRecipes;
const postUserRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    if (isNaN(id)) {
        res.status(400);
        res.send({ 'error': 'id should be an integer.' });
    }
    else {
        let recipes = yield core_1.insertUserRecipes(id, req.body);
        if (types_1.isError(recipes)) {
            res.status(400);
        }
        res.send(recipes);
    }
    ;
});
exports.postUserRecipes = postUserRecipes;
const deleteUserRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    const rid = helper_1.getIdFromRequest(req, 'rid');
    if (isNaN(id) || isNaN(rid)) {
        res.status(400);
        res.send({ 'error': 'id and rid should be integers.' });
    }
    else {
        let recipe = yield core_1.removeUserRecipe(id, rid);
        if (types_1.isError(recipe)) {
            res.status(400);
        }
        res.send(recipe);
    }
    ;
});
exports.deleteUserRecipe = deleteUserRecipe;
const userShoppingListEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    if (isNaN(id)) {
        res.status(400);
        res.send({ 'error': 'id should be an integer.' });
    }
    else {
        let entries = yield core_1.getUserShoppingListEntries(id);
        if (types_1.isError(entries)) {
            res.status(400);
        }
        res.send(entries);
    }
    ;
});
exports.userShoppingListEntries = userShoppingListEntries;
const patchUserShoppingListEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    if (isNaN(id)) {
        res.status(400);
        res.send({ 'error': 'id should be an integer.' });
    }
    else {
        let entries = yield core_1.updateUserShoppingListEntries(id, req.body);
        if (types_1.isError(entries)) {
            res.status(400);
        }
        res.send(entries);
    }
    ;
});
exports.patchUserShoppingListEntries = patchUserShoppingListEntries;
const userMealPlans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    if (isNaN(id)) {
        res.status(400);
        res.send({ 'error': 'id should be an integer.' });
    }
    else {
        let meal_plans = yield core_1.getUserMealPlans(id);
        if (types_1.isError(meal_plans)) {
            res.status(400);
        }
        res.send(meal_plans);
    }
    ;
});
exports.userMealPlans = userMealPlans;
const userMealPlanById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    const mid = helper_1.getIdFromRequest(req, 'mid');
    if (isNaN(id) || isNaN(mid)) {
        res.status(400);
        res.send({ 'error': 'id and mid should be integers.' });
    }
    else {
        let meal_plan = yield core_1.getUserMealPlanById(id, mid);
        if (types_1.isError(meal_plan)) {
            res.status(400);
        }
        res.send(meal_plan);
    }
    ;
});
exports.userMealPlanById = userMealPlanById;
const postUserMealPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    if (isNaN(id)) {
        res.status(400);
        res.send({ 'error': 'id should be an integer.' });
    }
    else {
        let meal_plan = yield core_1.insertUserMealPlan(id, req.body);
        if (types_1.isError(meal_plan)) {
            res.status(400);
        }
        res.send(meal_plan);
    }
    ;
});
exports.postUserMealPlan = postUserMealPlan;
const deleteUserMealPlan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = helper_1.getIdFromRequest(req);
    const mid = helper_1.getIdFromRequest(req, 'mid');
    if (isNaN(id) || isNaN(mid)) {
        res.status(400);
        res.send({ 'error': 'id and mid should be integers.' });
    }
    else {
        let meal_plan = yield core_1.removeUserMealPlan(id, mid);
        if (types_1.isError(meal_plan)) {
            res.status(400);
        }
        res.send(meal_plan);
    }
    ;
});
exports.deleteUserMealPlan = deleteUserMealPlan;
