module.exports = app => {
    const Class = require("../controllers/class.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Class
    router.post("/", Class.create);
  
    // Retrieve all Class
    router.get("/", Class.findAll);
  
    // Retrieve all published Classes
    router.get("/published", Class.findAllPublished);
  
    // Retrieve a single Claass with id
    router.get("/:id", Class.findOne);
  
    // Update a Class with id
    router.put("/:id", Class.update);
  
    // Delete a Class with id
    router.delete("/:id", Class.delete);
  
    // Delete all Classes
    router.delete("/", Class.deleteAll);
  
    app.use('/api/classes', router);
};