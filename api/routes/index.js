const express = require('express')



const usersRouter = require('./users');
const marksRouter = require('./marks');


const router = express.Router();

router.use('/users', usersRouter);
router.use('/marks', marksRouter);


module.exports = router