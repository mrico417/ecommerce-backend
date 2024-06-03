const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const { authenticate } = require('../controllers/auth-controller');

router.post('/login', authenticate);

router.get('/me',isLoggedIn, async(req,res,next)=>{
    try {
        res.send(req.account);
    } catch (error) {
        next(error);
    }
});



module.exports = router;


