const models = require("../../models");
const messageConstants = require("../constant/messageConstants");
const bcrypt = require('bcryptjs');
const { Op } = require("sequelize");
const jwt_token = require("../middlewares/jwt_token");
const { ErrorCodes } = require('../helper/constants');





//find by id
exports.getById = async (id) => {
    return models.users.findOne({ where: { id: id, deleted: false } });

};


//update
exports.update = async (id, data) => {
    let result = models.users.update(data, {
        where: {
            id: id,
            deleted: 0,
        }
    });
    if (result) {
        return true;
    }
};


//create (admin create user)
exports.create = async (obj) => {
    const data = {
        full_name: obj.full_name,
        email: obj.email,
        phone: obj.phone,
        role : obj.role,
        birth: obj.birth,
        address: obj.address,
        gender: obj.gender,
        password: obj.password,
    }
    const userEmail = await models.users.findOne({ where: { email: data.email, deleted: false } })
    if (!userEmail) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(data.password, salt);
            data.password = hashPassword;
            const user = await models.users.create(data);
            return user;
        } else {
            return Promise.resolve({
                message: messageConstants.USER_MAIL_EXIST,
            });
        };
};


//delete
exports.delete = async (id, options) => {
    return models.users.update(options, { where: { id: id, deleted: 0 } });
}


//restore
exports.restore = async (id, options) => {
    return models.users.update(options, { where: { id: id, deleted: 1 } });
};



// Login
exports.login = async (account) => {
    let condition = {
        deleted: 0,
    };
    condition = {
        ...condition,
        [Op.or]: {
            email: account.user_name,
            phone: account.user_name,
            ma_sv : account.user_name,
            ma_gv : account.user_name,
        }
    };
    const user = await models.users.findOne({ where: condition });
    if (user) {
        const isMatch = await bcrypt.compare(account.password, user.password);
        if (isMatch) {
            if (user.status == 1) {
                const accessToken = jwt_token.signAccessToken(user);
                const refreshToken = jwt_token.signRefreshToken(user);
                return { accessToken, refreshToken, user };
            } else {
                return Promise.resolve({
                    status: ErrorCodes.ERROR_CODE_API_NOT_FOUND,
                    message: messageConstants.USER_NOT_ACTIVE,
                });
            }
        }
        else {
            return Promise.resolve({
                message: messageConstants.USER_PASS_INVALID,
            });
        }
    } else {
        return Promise.resolve({
            message: messageConstants.USER_USERNAME_NOT_EXIST,
        });
    }
};


// Forget-Password
exports.forgetPassword = async (account) => {
    const user = await models.users.findOne({ where: { otp: account.otp } });
    if (user) {
        const date = await models.users.findOne({ where: { expires: { [Op.gte]: new Date() } } });
        if (date) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(account.password, salt);
            account.password = hashPassword;
            const options = { password: account.password, update_date: new Date() };
            return models.users.update(options, { where: { id: user.id } });
        } else {
            return Promise.resolve({
                message: messageConstants.EMAIL_DATE_EXPIRED,
            });
        }
    } else {
        return Promise.resolve({
            message: messageConstants.USER_USERNAME_NOT_EXIST,
        });
    }
};


// change password
exports.changePassword = async (request) => {
    console.log(request.dataValues);
    const user = await models.users.findOne({
        where: {
            deleted: 0,
            status: 1,
            id: request.dataValues.id,
        }
    });
    if (user) {
        var isMatch = await bcrypt.compare(request.password, user.password);
        if (isMatch) {
            const isMatch2 = await bcrypt.compare(request.new_password, user.password);
            if (!isMatch2) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(request.new_password, salt);
                request.new_password = hashPassword;
                const options = {
                    password: request.new_password,
                    updated_date: new Date()
                };
                return models.users.update(options, {
                    where: {
                        id: user.id
                    }
                });
            } else {
                return Promise.reject({ status: ErrorCodes.ERROR_CODE_ITEM_EXIST, message: messageConstants.USER_PASS_EXIST });
            }
        } else {
            return Promise.reject({ status: ErrorCodes.ERROR_CODE_OLD_PASSWORD_NOT_CORRECT, message: messageConstants.USER_PASS_INVALID });
        }

    }
};



exports.getAllPagingStudent = (searchViewModel) => {
    limit = searchViewModel.limit;
    offset = searchViewModel.offset;
    const query = searchViewModel.query;
    let condition = {
        deleted: 0,
    };
    return models.users.findAndCountAll({
        where: condition,
        limit: limit,
        offset: offset
    });
};
