const userService = require('../service/userService');
const markService = require('../service/markService');
const { ErrorCodes } = require('../helper/constants');
const { responseSuccess, responseWithError } = require("../helper/messageResponse");
const { generateNumber } = require('../helper/generateCode');
const Paginator = require('../commons/paginator');



exports.getAllPagingStudent = async (req, res, next) => {
    const page = parseInt(req.query.page_index) || 1;
    const size = parseInt(req.query.page_size);
    const { limit, offset } = Paginator.getPagination(page, size);
    const query = req.query;
    const condition = {
        limit,
        offset,
        query
    };
    userService.getAllPagingStudent(condition).then((data) => {
        const response = Paginator.getPagingData(data, page, limit);
        res.json(responseSuccess({ total_items: response.total_items, total_pages: response.total_pages, current_page: response.current_page, data: response.rows }))
    }).catch((err) => {
        console.log(err);
        return res.json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    });
}

exports.getAllPagingTeacher = async (req, res, next) => {
    const page = parseInt(req.query.page_index) || 1;
    const size = parseInt(req.query.page_size);
    const { limit, offset } = Paginator.getPagination(page, size);
    const query = req.query;
    const condition = {
        limit,
        offset,
        query
    };
    userService.getAllPagingTeacher(condition).then((data) => {
        const response = Paginator.getPagingData(data, page, limit);
        res.json(responseSuccess({ total_items: response.total_items, total_pages: response.total_pages, current_page: response.current_page, data: response.rows }))
    }).catch((err) => {
        console.log(err);
        return res.json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    });
}

exports.create = async (req, res, next) => {
    try {
        const user = await userService.create(req.body, req.user).then(result => {
            
            if (result.message) {
                res.json(responseWithError(ErrorCodes.ERROR_CODE_ITEM_EXIST));
            } else {
                if(result.role == 2){
                    const ma_gv = "GV" + generateNumber(4,result);
                    userService.update(result.id,{
                        ma_gv : ma_gv,    
                    });
                }if(result.role == 3){
                    const ma_sv = "SV" + generateNumber(4,result);
                    userService.update(result.id,{
                        ma_sv : ma_sv,    
                    });
                    markService.create({
                        ma_sv : ma_sv,
                        user_id : result.id
                    })
                }
                res.json(responseSuccess(result));
            };
        }).catch((err) => {
            res.json(responseWithError(err.status, 'error', err.message || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
        });
    } catch (err) {
        return next(err);
    }
};


exports.getById = async (req, res, next) => {
    try {
        await userService.getById(req.params.id).then(result => {
            console.log(result);
            res.json(responseSuccess(result));
            
        }).catch((err) => {
            res.json(responseWithError(err.status, 'error', err.message || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
        });
    } catch (err) {
        return next(err);
    }
}


exports.update = async (req, res, next) => {
    try {
        const user = await userService.update(req.params.id, req.body).then(result => {
            if (result.message) {
                res.json(responseWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST));
            } else {
                res.json(responseSuccess(result));
            };
        }).catch((err) => {
            res.json(responseWithError(err.status, 'error', err.message || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
        });
    } catch (err) {
        return next(err);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const user = await userService.delete(req.params.id).then(result => {
            if (result.message) {
                res.json(responseWithError(ErrorCodes.ERROR_CODE_ITEM_NOT_EXIST));
            } else {
                res.json(responseSuccess(result));
            };
        }).catch((err) => {
            res.json(responseWithError(err.status, 'error', err.message || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
        });
    } catch (err) {
        return next(err);
    }
}


// Login
exports.login = (req, res, next) => {
    userService.login(req.body).then((result) => {
        if (result.message) {
            res.json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR,"Thông tin đăng nhập, mật khẩu hoặc tài khoản không đúng",));
        } else {
            result = Object.assign(result, { access_token: result.access_token });
            result = Object.assign(result, { refresh_token: result.refresh_token });
            res.json(responseSuccess({
                data_user: {
                    id: result.user.id,
                    full_name: result.user.full_name,
                    birth: result.user.birth,
                    email: result.user.email,
                    phone: result.user.phone,
                    gender: result.user.gender,
                    role: result.user.role
                },
                access_token: result.accessToken,
                refresh_token: result.refreshToken
            }));
        }
    }).catch((err) => {
        console.log(err);
        res.json(responseWithError(err.status, 'error', err.message || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    });
};


exports.changePassword = async (req, res, next) => {
    const request = {
        password: req.body.password.toString(),
        new_password: req.body.new_password.toString(),
        ...req.user
    }
    await userService.changePassword(request).then(result => {
        if (result.message) {
            res.json(responseWithError(ErrorCodes.ERROR_CODE_API_NOT_FOUND));
        } else {
            res.json(responseSuccess());
        }
    }).catch((err) => {
        console.log(err);
        res.json(responseWithError(err.status, 'error', err.message || ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    });
}


