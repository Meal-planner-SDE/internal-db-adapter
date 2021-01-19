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
// router.get('/', hello); // Example
router.get('/users', controller_1.users);
router.post('/users', controller_1.postUser);
router.patch('/users/:id', controller_1.patchUser);
router.get('/users/:username', controller_1.userByUsername);
// router.get('/regions', regions);
// router.get('/region', regionById);
// router.get('/cases', casesByRegionId);
// router.get('/ranking', ranking);
// router.get('/charts/bar', barChart);
// router.get('/charts/line', lineChart);
exports.default = router;
