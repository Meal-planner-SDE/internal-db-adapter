"use strict";
/*********
 * Route definitions
 *   All the routes that you want to implement should be defined here!
 *   You should avoid to put code here: it's a better approach to call
 *   methods from the controllers in order to process the requests!
 *   In this way, here you can have a more organized way to check all
 *   your routes!
 *   In a huge project, you can define multiple routers in order to divide
 *   the endpoints in different files by the domain of their operation.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
// Possible methods: .get, .post, .put, .patch, .delete
// To add URL parameters (Doable for any method! Not only for GET):
// router.get('/:parameter1/:parameter2', f);
router.get('/', controller_1.hello); // Example
router.get('/users', controller_1.users);
router.get('/users/:username', controller_1.userByUsername);
router.get('/regions', controller_1.regions);
router.get('/region', controller_1.regionById);
router.get('/cases', controller_1.casesByRegionId);
router.get('/ranking', controller_1.ranking);
router.get('/charts/bar', controller_1.barChart);
router.get('/charts/line', controller_1.lineChart);
exports.default = router;
