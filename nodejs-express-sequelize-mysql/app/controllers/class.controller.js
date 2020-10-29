const db = require("../models");
const Class = db.classes;
const Op = db.Sequelize.Op;

// Create and Save a new course
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }
    
    // Create a course
    const course = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    
    // Save course in the database
    Class.create(course)
        .then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the course listing."
            });
    });
};

// Retrieve all Class from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Class.findAll({ where: condition })
        .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving classes."
        });
    });
};

// Find a single Class with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Class.findByPk(id)
        .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving class with id=" + id
        });
    });
};

// Update a Class by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Class.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Class was updated successfully."
        });
        } else {
            res.send({
                message: `Cannot update the class with id=${id}. Maybe it doesn't exist`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Class with id=" + id
        });
    });
};

// Delete a Class with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Class.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Class was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete class with id=${id}. Maybe it doesn't exist.`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete class with id=" + id
        });
    });
};

// Delete all Classes from the database.
exports.deleteAll = (req, res) => {
    Class.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Classes were deleted successfully!` });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while removing all classes."
        });
    });
};

// Find all published Classes
exports.findAllPublished = (req, res) => {
    Class.findAll({ where: { published: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving classes."
        });
    });
};
