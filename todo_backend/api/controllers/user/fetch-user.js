module.exports = {

  friendlyName: 'Fetch user',
  description: '',
  inputs: {
  },
  exits: {
    success: {
      statusCode: 200,
      description: 'Users found',
    },
    error: {
      description: 'Something went wrong',
    },
  },
  fn: async function (inputs, exits) {
    try{
      const users = await User.find();
      return exits.success(users);
    }
    catch(error)
    {
      sails.log.error(error);
      return exits.error({
        message: 'Error while fetching user',
        error: error.message,
      });
    }
  }
};
