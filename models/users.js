"use strict";
const moment = require("moment");
const { Sequelize, DataTypes } = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  var users = sequelize.define(
    "users",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(4),
      },
      full_name: {
        type: Sequelize.STRING(255),
      },
      password: {
        type: Sequelize.STRING(255),
      },
      gender: {
        type: Sequelize.INTEGER(2),
      }, 
      address: {
        type: Sequelize.TEXT('long'),
      },
      email: {
        type: Sequelize.STRING(255),
      },
      phone: {
        type: Sequelize.STRING(15),
      },
      avatar: {
        type: Sequelize.STRING(1024),
      },
      ma_sv: {
        type: Sequelize.STRING(255),
      },
      ma_gv: {
        type: Sequelize.STRING(255),
      },
      role: {
        // 1 : admin
        // 2 : giao vien
        // 3 : sinh vien
        type: Sequelize.INTEGER(2),
        defaultValue: false,
      },
      status: {
        type: Sequelize.INTEGER(2),
        defaultValue: true,
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
  return users;
};
