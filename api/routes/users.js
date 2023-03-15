const express = require('express');
const userController = require("../controller/userController");
const { checkAccessToken, checkAdminAndTeacher } = require('../middlewares/jwt_token');
const router = express.Router();

router.get('/all-paging-teacher',userController.getAllPagingTeacher);
router.get('/all-paging-student',userController.getAllPagingStudent);
router.get('/:id',userController.getById);
router.post('/create',checkAccessToken,checkAdminAndTeacher,userController.create);
router.post('/login',userController.login);
router.post('/change-password',checkAccessToken,userController.changePassword);
router.put('/:id',checkAccessToken,userController.update);

module.exports = router