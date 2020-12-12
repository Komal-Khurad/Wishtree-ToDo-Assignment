
module.exports.policies = {

  "user/login": 'can-login',

  // '*': true,
  TaskController: {
    // '*': 'isLoggedIn',
    //'find': 'isLoggedIn',
    // 'update': 'isLoggedIn',
    // 'delete': 'isLoggedIn',
  },

};
