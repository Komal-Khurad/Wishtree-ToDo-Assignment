module.exports = {
   
  update: async function(req, res){
    try{
        let param = req.allParams();

        let attribute = {};

        if(param.isActive)
            attribute.isActive = param.isActive;
        
        const result = await User.update({id:req.params.id}, attribute);
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
}