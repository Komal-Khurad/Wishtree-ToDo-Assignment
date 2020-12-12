/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //sails email verification routes
  'POST /user/register': 'user/register',
  'POST /user/login': 'user/login',
  'GET /user/confirm': 'user/confirm',
  'GET /users': 'user/fetch-user',
  'PUT /user/update/:id': 'UserController.update',


  //Users APIs
  // 'GET /user/:id':'UserController.findOne',
 
  //Task APIs
  'POST /task/addTask': 'TaskController.create',
  'GET /tasks': 'TaskController.find',
  'GET /task/:id': 'TaskController.findOne',
  'PUT /task/update/:id': 'TaskController.update',
  'DELETE /task/delete/:id': 'TaskController.delete'

  // 'GET /tasksByUserId/:id':'TaskController.findTasksByUserId'


};
