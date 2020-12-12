module.exports = {

  friendlyName: 'Register',

  description: 'Register user.',

  inputs: {

    fName: {
      type: 'string',
      required: true,
    },
    lName: {
      type: 'string',
      required: true,
    },
    gender: {
      type: 'string',
    },
    dob: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8,
    },
    isActive:{
      type: 'boolean'
    }
  },

  exits: {
    success: {
      statusCode: 201,
      description: 'New user created',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address already in use',
    },
    error: {
      description: 'Something went wrong',
    },
  },

  fn: async function (inputs, exits) {
    try{
      const newEmailAddress = inputs.email.toLowerCase();

      //create a token for this user which will be used for the email verification
      const token = await sails.helpers.strings.random('url-friendly');


      let newUser = await User.create({
        fName: inputs.fName,
        lName: inputs.lName,
        gender: inputs.gender,
        dob: inputs.dob,
        email: newEmailAddress,
        password: inputs.password,
        emailProofToken: token,
        emailProofTokenExpiresAt:
          Date.now() + sails.config.custom.emailProofTokenTTL,
        isActive: inputs.isActive,
        
      }).fetch();

      const confirmLink = `${sails.config.custom.baseUrl}/user/confirm?token=${token}`;

      const email = {
        to: newUser.email,
        subject: 'Confirm Your account',
        template: 'confirm',
        context: {
          name: newUser.fName +' '+ newUser.lName,
          confirmLink: confirmLink,
        },
      };
      await sails.helpers.sendMail(email);

      return exits.success({
        message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,
      });
    }
    catch(error)
    {
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occurred',
          error: 'This email address already exits',
        });
      }
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }

  }
};
