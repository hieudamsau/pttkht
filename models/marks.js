"use strict";
const moment = require("moment");
const { Sequelize, DataTypes } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    var marks = sequelize.define(
        "marks",
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(4),
            },
            ma_sv: {
                type: Sequelize.STRING(255),
            },
            user_id: {
                type: Sequelize.STRING(255),
            },
            status: {
                type: Sequelize.INTEGER(2),
                defaultValue: true,
            },
            toan_cao_cap: {
                type: Sequelize.FLOAT(10),
            },
            triet_hoc: {
                type: Sequelize.FLOAT(11,2),
            },
            pttkht: {
                type: Sequelize.FLOAT(11,2),
            },
            gpa: {
                type: Sequelize.FLOAT(11,2),
            },
            deleted: {
                type: Sequelize.INTEGER(2),
                defaultValue: false,
            },
            created_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                get() {
                    return moment(this.getDataValue("created_date")).format(
                        "DD-MM-YYYY HH:mm:ss"
                    );
                },
            },
            created_by: {
                type: Sequelize.STRING(255),
            },
            updated_date: {
                type: Sequelize.DATE,
            },
            updated_date: {
                type: Sequelize.DATE,
                allowNull: true,
                get() {
                    return moment(this.getDataValue("updated_date")).format(
                        "DD-MM-YYYY HH:mm:ss"
                    );
                },
            },
        },
        {
            timestamps: false,
        }
    );
    return marks;
};