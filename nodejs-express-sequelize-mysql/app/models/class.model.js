module.exports = (sequelize, Sequelize) => {
    const Class = sequelize.define("classes", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });
    return Class;
};
  