const express = require('express');
const userController = require("../controller/userController");
const { checkAccessToken, checkAdminAndTeacher } = require('../middlewares/jwt_token');
const router = express.Router();

router.get('/all-paging',userController.allPaging);
router.get('/:id',userController.getById);
router.post('/create',checkAccessToken,checkAdminAndTeacher,userController.create);
router.post('/login',userController.login);
router.post('/change-password',checkAccessToken,userController.changePassword);
router.put('/:id',checkAccessToken,userController.update);

module.exports = router