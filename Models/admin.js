const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, Sequelize) {

   // User Sequelize Schema
   const Admin = sequelize.define('admin', {
    email: { type: Sequelize.STRING, notNull: true },
    username: { type: Sequelize.STRING, notNull: true },
    password: { type: Sequelize.STRING, notNull: true }
  });

return Admin;

}
