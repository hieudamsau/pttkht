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
        const data = [];
        data.push(result.dataValues)
        console.log(data)
        res.json(responseSuccess(data));
    } catch (error) {
        console.log(error);
        res.json(responseWithError(error));
    }
}   



exports.getAllPaging = async (req, res, next) => {
    const page = parseInt(req.query.page_index) || 1;
    const size = parseInt(req.query.page_size);
    const { limit, offset } = Paginator.getPagination(page, size);
    const query = req.query;
    const condition = {
        limit,
        offset,
        query
    };
    markService.getAllPaging(condition).then((data) => {
        const response = Paginator.getPagingData(data, page, limit);
        res.json(responseSuccess({ total_items: response.total_items, total_pages: response.total_pages, current_page: response.current_page, data: response.rows }))
    }).catch((err) => {
        console.log(err);
        return res.json(responseWithError(ErrorCodes.ERROR_CODE_SYSTEM_ERROR, 'error', err));
    });
}
