const models = require("../Models");    // Models
const express = require('express');
const router = express.Router();
const Admin = models.admin;   // accessing admin model definition file


module.exports.construct = () => {

    /* ================
    ADMIN LOGIN ROUTE
================== */
    router.get('/',(req,res) => {
        res.send("in /admin");
    })
    router.post('/login', (req, res) => {
        res.send('test');
    //     if(!req.body.username) {
    //         res.json({ success: false, message: 'No username was provided' });
    //     } else {
    //         if(!req.body.password) {
    //             res.json({ success: false, message: 'No password was provided' });
    //         } else {
    //             console.log('==================================');
    //             Admin.findOne({ where: {username: req.body.username.toLowerCase() }
    //         }).then(user => {
    //             if(!user) {
    //                 console.log(user);
    //                 res.json({ success: false, message: 'Username not found' });
    //             } else {
    //                 if(!req.body.password === user.dataValues.password) {
    //                     res.json({ success: false, message: 'Incorrect password' });
    //                 } else {
    //                     res.json({ success: true, message: 'Successful login!' });
    //                 }
    //                 // var validPassword = User.comparePassword(req.body.password, user.dataValues.password);
    //                 // if(!validPassword) {
    //                 //     res.json({ success: false, message: 'Incorrect password' });
    //                 // } else { 
    //                 //     if(!user.dataValues.active) {
    //                 //         res.json({ success: false, message: 'Account is not yet activated. Please check your e-mail for activation link.', expired: true });
    //                 //     } else {
    //                 //         // create token for user login  
    //                 //         const token = jwt.sign({ userId: user.dataValues.id }, secret, { expiresIn: '24h' });
    //                 //         res.json({ 
    //                 //             success: true,
    //                 //             message: 'Successful login!',
    //                 //             token: token,
    //                 //             user: { username: user.dataValues.username,
    //                 //                     email: user.dataValues.email }
    //                 //         });
    //                 //     }
                        
    //                 // }
    //             }
    //         }).catch((err) => {
    //             console.log('in catch');
    //             res.json({ success: false, message: err });
    //         });
    //     }
    // }
});

    
}

module.exports.router = router; 
