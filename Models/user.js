const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, Sequelize) {

   // User Sequelize Schema
   const User = sequelize.define('user', {
    email: { type: Sequelize.STRING, notNull: true },
    username: { type: Sequelize.STRING, notNull: true },
    password: { type: Sequelize.STRING, notNull: true },
    active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
    temporarytoken: { type: Sequelize.STRING },
    resettoken: { type: Sequelize.STRING }
  });

  // can not have multiple module.exports{} in one file
  User.comparePassword = function(password, hashedPass) {
    return bcrypt.compareSync(password, hashedPass);
  }


  // Encrypt password before inserting user into database
  User.beforeCreate(function(user, options) {
    return cryptPassword(user.password)
      .then(success => {
        user.password = success;
      })
      .catch(err => {
        if (err) console.log(err);
      });
  });

// Hash the given password
function cryptPassword(password) {
  console.log("cryptPassword" + password);
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(err, salt) {
      // Encrypt password using bycrpt module
      if (err) return reject(err);

      bcrypt.hash(password, salt, null, function(err, hash) {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  });
}

  

// Method to compare password 
// comparePassword: (password) => {
//     return bcrypt.compareSync(password, this.password); 
// }

// User.prototype.comparePassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

return User;

}
