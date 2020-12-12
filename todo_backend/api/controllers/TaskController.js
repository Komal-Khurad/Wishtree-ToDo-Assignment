/**
 * TaskController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  
  /**
   * `TaskController.create()`
   */
  create: async function (req, res) {
    try{
      //fetch all request data
      let param = req.allParams();

      console.log(param);
      if(!param.task.title )
      {
        console.log('title is required!');
        return res.badRequest({errMsg: 'title is required!'})
      }
      const task = await Task.create({
        title: param.task.title,
        description:param.task.description,
        status:param.task.status,
        user: param.task.user
      })
      console.log('task created successfully!');
      return res.ok(task);
    }
    catch(error)
    {
      if(error.name==='validationError')
      {
        return res.badRequest(error);
      }
      else{
        return res.serverError(error);
      }
    }
  },

  /**
   * `TaskController.find()`
   */
  find: async function (req, res) {
    try{
      const tasks = await Task.find();
      return res.ok(tasks);
    }
    catch(error)
    {
      return res.serverError(error);
    }
  },

  /**
   * `TaskController.findOne()`
   */
  findOne: async function (req, res) {
    try{
      const task = await Task.findOne({
        id:req.params.id
      });

      return res.ok(task);
    }
    catch(error)
    {
      return res.serverError(error);
    }
  },

  /**
   * `TaskController.findOne()`
   */
  findTasksByUserId: async function (req, res) {
    try{
      const tasks = await User.find({
        id:req.params.id
      });
      
      return res.ok(tasks);
    }
    catch(error)
    {
      return res.serverError(error);
    }
  },

  /**
   * `TaskController.update()`
   */
  update: async function(req, res){
    try{
        let param = req.allParams();

        let attribute = {};

        if(param.title)
            attribute.title = param.title;
        if(param.description)
            attribute.description = param.description;
        if(param.status)
            attribute.status = param.status;
        const result = await Task.update({id:req.params.id}, attribute);
        return res.ok(result);
    }
    catch(err){
        res.serverError(err);
    }
  },

  /**
   * `TaskController.delete()`
   */
  delete: async function(req, res)
  {
      try
      {
          const result = await Task.destroy({
              id:req.params.id
          });
          res.ok(result);
      }
      catch(err)
      {
        res.serverError(err);
      }
  }
};

