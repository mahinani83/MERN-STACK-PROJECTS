const express = require("express")
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('password should atleast 6 characters')
],userController.registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min:6}).withMessage('password should atleast 6 characters')
],userController.loginUser)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)

router.get('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports = router;