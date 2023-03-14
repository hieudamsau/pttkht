const models = require('../../models');

// models.marks.belongsTo(models.users,{ foreignKey: 'user_id' }
// )

exports.create = async (data) =>{
    return models.marks.create(data);
}


exports.update = async (ma_sv,data) =>{
    return models.marks.update(data,{where : {ma_sv:ma_sv,deleted : false}});
}

exports.deleted = async (id) =>{
    return models.marks.destroy({where : {
        id:id,
        deleted : false
    }
})
}

exports.getByMsv = async (ma_sv) => {
    return models.marks.findOne({
        where : {
            ma_sv : ma_sv,
            deleted : false
        },
        include:[{
            model: models.users,
            attributes: ["full_name","avatar"]
          }
          ]
    })
}

