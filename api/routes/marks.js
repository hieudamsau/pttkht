const express = require('express');
const router = express.Router();
const markController = require('../controller/markController');
const { checkAccessToken, checkAdminAndTeacher } = require('../middlewares/jwt_token');

router.get('/:ma_sv', markController.getByMsv);
router.post('/', markController.create);
router.delete('/:id', markController.delete);
router.put('/:ma_sv',checkAccessToken,checkAdminAndTeacher,markController.update);

module.exports = router