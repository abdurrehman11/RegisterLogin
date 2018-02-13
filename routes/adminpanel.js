const models = require("../Models");    // Models
const express = require('express');
const router = express.Router();
const Admin = models.admin;   // accessing admin model definition file
const User = models.user;   // accessing user model definition file
const secret = require('crypto').randomBytes(256).toString('hex');
const jwt = require('jsonwebtoken');


module.exports.construct = () => {

    /* ================
    ADMIN LOGIN ROUTE
================== */

    router.post('/login', (req, res) => {
        //res.send('test');
        if(!req.body.username) {
            res.json({ success: false, message: 'No username was provided' });
        } else {
            if(!req.body.password) {
                res.json({ success: false, message: 'No password was provided' });
            } else {
                Admin.findOne({ where: {username: req.body.username.toLowerCase() }
            }).then(admin => {
                if(!admin) {
                    res.json({ success: false, message: 'Username not found' });
                } else {
                    console.log(admin);
                    if(req.body.password !== admin.dataValues.password) {
                        res.json({ success: false, message: 'Incorrect password' });
                    } else {
                        // create token for admin login  
                        const token = jwt.sign({ adminId: admin.dataValues.id }, secret, { expiresIn: '24h' });
                        res.json({ 
                            success: true,
                            message: 'Successful login!',
                            token: token,
                            user: { username: admin.dataValues.username,
                                    email: admin.dataValues.email }
                            });
                        //res.json({ success: true, message: 'Successful login!' });
                    }
                }
            }).catch((err) => {
                console.log('in catch');
                res.json({ success: false, message: err });
            });
        }
    }
});

    /* =======================
        Get All Users Route
    ==================== */

    router.get('/allUsers', (req, res) => {
        User.findAll({
            attributes: ['id', 'email', 'username', 'block']
        }).then(users => {
            if(!users) {
                //console.log(user.dataValues.email);
                res.json({ success: false, message: 'No user found' });
            } else {
                // users is an array of rows of database
                //console.log(users[0].dataValues.username);
                res.json({ success: true, message: 'Found users', users: users });
            }
        }).catch((err) => {
            res.json({ success: false, message: err });
        });
    });


    /* =========================
        Route to block a user
    ======================= */

    router.put('/block/:id', (req, res) => {
        if(!req.params.id) {
            res.json({ success: false, message: 'No user id found' });
        } else {
            User.findOne({
                where: { id: req.params.id }
            }).then(user => {
                if(!user) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    if(user.dataValues.block) {
                        res.json({ success: false, message: 'User is already blocked' });
                    } else {
                        user.block = true;
                        user.save({ fields: ['block'] }).then(() => {
                            res.json({ success: true, message: 'User blocked!' });
                        }).catch((err) => {
                            res.json({ success: false, message: 'Failed to block user' });
                        });
                    }
                }
            }).catch((err) => {
                res.json({ success: false, message: err });
            });
        }
    });

    /* =========================
        Route to unblock a user
    ======================= */

    router.put('/unblock/:id', (req, res) => {
        if(!req.params.id) {
            res.json({ success: false, message: 'No user id found' });
        } else {
            User.findOne({
                where: { id: req.params.id }
            }).then(user => {
                if(!user) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    if(!user.dataValues.block) {
                        res.json({ success: false, message: 'User is already unblocked' });
                    } else {
                        user.block = false;
                        user.save({ fields: ['block'] }).then(() => {
                            res.json({ success: true, message: 'User unblocked!' });
                        }).catch((err) => {
                            res.json({ success: false, message: 'Failed to block user' });
                        });
                    }
                }
            }).catch((err) => {
                res.json({ success: false, message: err });
            });
        }
    });


    /* =========================
        Route to delete a user
    ======================= */

    router.delete('/deleteuser/:id', (req, res) => {
        if(!req.params.id) {
            res.json({ success: false, message: 'No id provided' });
        } else {
            User.findOne({
                where: { id: req.params.id }
            }).then(user => {
                if(!user) {
                    res.json({ success: false, message: 'User not found' });
                } else {
                    user.destroy().then(() => {
                         res.json({ success: true, message: 'User deleted!' });
                    }).catch((err) => {
                         res.json({ success: false, message: 'User not deleted' });
                    });
                }
            }).catch((err) => {
                res.json({ success: false, message: err });
            })
        }
    });

    
}

module.exports.router = router; 
