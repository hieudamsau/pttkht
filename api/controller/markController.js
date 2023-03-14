const markService= require('./../service/markService')

const { ErrorCodes } = require('../helper/constants');
const { responseSuccess, responseWithError } = require("../helper/messageResponse");
const Paginator = require('../commons/paginator');
const { image_response } = require("../helper/image");

exports.create = async (req, res, next) => {
    try {
        req.body.deleted = 0;
        let data = await markService.create(req.body);
        res.json(responseSuccess(data));
    } catch (error) {
        res.json(responseWithError(error));
    }
}   

exports.update = async (req, res, next) => {
    try {
        let ma_sv = req.params.ma_sv;
        let result = await markService.update(ma_sv, req.body)
        if (result == 1) {
            return res.json(responseSuccess());
        }
    } catch (error) {
        console.log(error);
        res.json(responseWithError(error));
    }
}

exports.delete = async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await markService.deleted(id);
        if (result == 1) {
            return res.json(responseSuccess());
        }
    } catch (error) {
        console.log(error);
        res.json(responseWithError(error));
    }
}


exports.getByMsv = async (req,res,next) =>{
    try {
        let ma_sv = req.params.ma_sv;
        let result = await markService.getByMsv(ma_sv);
        res.json(responseSuccess(result));
    } catch (error) {
        console.log(error);
        res.json(responseWithError(error));
    }
}