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

import express from 'express';
import {
  // hello,
  // ranking,
  // regionById,
  // regions,
  // barChart,
  // casesByRegionId,
  // lineChart,
  users,
  postUser,
  patchUser,
  userByUsername,

  userRecipes,
  postUserRecipes,
  deleteUserRecipe,
} from './controller';

const router = express.Router();

// Possible methods: .get, .post, .put, .patch, .delete

// To add URL parameters (Doable for any method! Not only for GET):
// router.get('/:parameter1/:parameter2', f);

// router.get('/', hello); // Example

router.get('/users', users);
router.post('/users', postUser);
router.patch('/users/:id', patchUser);
router.get('/users/:username', userByUsername);


router.get('/users/:id/recipes', userRecipes);
router.post('/users/:id/recipes', postUserRecipes);
router.delete('/users/:id/recipes/:rid', deleteUserRecipe);

// router.get('/regions', regions);
// router.get('/region', regionById);
// router.get('/cases', casesByRegionId);

// router.get('/ranking', ranking);

// router.get('/charts/bar', barChart);
// router.get('/charts/line', lineChart);

export default router;
