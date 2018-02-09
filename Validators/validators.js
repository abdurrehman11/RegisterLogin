var validator = require('validator');
const models = require("../Models");
const bcrypt = require('bcrypt-nodejs');
const User = models.user;   // accessing user model definition file

module.exports = {

    // Check Email Format
    checkEmailFormat: function(email) {
        var email = validator.trim(email);
        if(email === "") {
            return 'You must provide an Email or Email can not be empty';
        }

        var checkEmailLength = validator.isLength(email, {min:5, max:30});
        if(!checkEmailLength) {
            return 'Email must be atleast 5 characters but no more than 30';
        }

        var checkEmail = validator.isEmail(email);
        if(!checkEmail) {
            return 'Email format is not valid';
        }

        return false;
    },

    // Check if Email already exists
    checkEmailExists: function(email) {
        return User.findOne({ 
            attributes: ['email'],
            where: {
                email: email
            } 
        }).then( result => {
            // console.log(result.dataValues.email);
             return new Promise((resolve, reject) => {
                      if(result) {
                          resolve("Email already exists. Please chose another email");
                      } else {
                          reject('Email not already exists');
                      }
                  });
        });
    },

    // Check Username Format
    checkUserNameFormat: function(username) {
        var username = validator.trim(username);
        if(username === "") {
            return 'You must provide a Username or Username can not be empty';
        }

        var checkUserNameLength = validator.isLength(username, {min:3, max:15});
        if(!checkUserNameLength) {
            return 'Username must be atleast 3 characters but no more than 15';
        }

        var checkUserName = validator.matches(username, /^[a-zA-Z0-9]+$/);
        if(!checkUserName) {
            return 'Username must not have any special characters';
        }

        return false;
    },

    // Check if Username already exists
    checkUserNameExists: function(username) {
        return User.findOne({ 
            attributes: ['username'],
            where: {
                username: username
            } 
        }).then( result => {
             //console.log(result.dataValues.username);
             return new Promise((resolve, reject) => {
                      if(result) {
                          resolve("Username already exists. Please chose another username");
                      } else {
                          reject('Username not already exists');
                      }
                  });
        });
    },

    // Encrypt password
    encryptPassword : function(password) {
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
    },

    // Check Password Format
    checkPasswordFormat: function(password) {
        var password = validator.trim(password);
        if(password === "") {
            return 'You must provide a Password or Password can not be empty';
        }

        var checkPasswordLength = validator.isLength(password, {min:8, max:35});
        if(!checkPasswordLength) {
            return 'Password must be atleast 8 characters but no more than 35';
        }

        var checkPassword = validator.matches(password, /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        if(!checkPassword) {
            return 'Password must have atleast one uppercase, lowercase, special characters and numbers';
        }

        return false;
    }



}