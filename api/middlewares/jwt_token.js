const jwt = require('jsonwebtoken');
const models = require('../../models');
const { ErrorCodes } = require('../helper/constants');
const { responseSuccess, responseWithError } = require("../helper/messageResponse");

exports.checkAccessToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decodedToken;
        await models.users.findOne({ where: deleted = 0 ? { phone: req.user.phone } : { email: req.user.email }, attributes: ['id', 'full_name', 'email', 'phone', 'role','ma_sv','ma_gv'] }).then(data => {
            if (data) {
                req.user = data;
                next();
            } else {
                res.status(403).json({ message: "Not Allowed!" })
            };
        }).catch(err => {
            res.send({
                error: {
                    status: err.status || 500,
                    message: err.message
                },
            })
        });
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err.message
        })
    }
};

exports.checkAccessTokenorNot = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return null;
        } else {
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log(decodedToken)
            if (!decodedToken) {
                return null
            }
            req.user = decodedToken;
            const data = await models.users.findOne({ where: deleted = 0 ? { phone: req.user.phone } : { email: req.user.email }, attributes: ['id', 'full_name', 'email', 'phone', 'role','ma_sv','ma_gv'] });
            return data;
        }
    } catch (err) {
         return null;
    }
};

exports.checkAdmin = (req, res, next) => {
    try {
        var role = req.user.role;
        if (role == 1) {
            next();
        } else {
            res.status(403).json({ message: "Not Allowed!" })
        }
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err.message
        })
    }
};
exports.checkAdminAndTeacher= (req, res, next) => {
    try {
        var role = req.user.role;
        if (role == 1 || role == 2) {
            next();
        } else {
            res.status(403).json({ message: "Not Allowed!" })
        }
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err.message
        })
    }
};

exports.checkUser = (req, res, next) => {
    try {
        var role = req.user.role;
        if (role == 0) {
            next();
        } else {
            res.status(403).json({ message: "Not Allowed!" })
        }
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err.message
        })
    }

};

exports.checkRefreshToken = (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req, process.env.REFRESH_TOKEN_SECRET);
        if (decodedToken) {
            return decodedToken;
        } else {
            res.status(403).json({ message: "RefreshToken is invalid!" });
        }
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token provided!",
            error: err.message
        })
    }
};
exports.signAccessToken = (req, res, next) => {
    try {
        const payload = {
            full_name: req.full_name,
            phone: req.phone,
            email: req.email
        }
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    } catch (err) {
        return res.status(401).json({
            error: err
        })
    }
};
exports.signRefreshToken = (req, res, next) => {
    try {
        const payload = {
            full_name: req.full_name,
            address: req.address,
        }
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    } catch (err) {
        return res.status(401).json({
            error: err
        })
    };
};