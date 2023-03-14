"use strict";

const fs = require("fs");
const { request } = require("http");
const { required } = require("joi");
const path = require("path");
const Sequelize = require("sequelize");
const { dataConverter } = require("swagger-autogen/src/handle-data.js");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    operatorsAliases: 0,
    timezone: "+07:00",

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users")(sequelize, Sequelize);
db.marks = require("./marks")(sequelize, Sequelize);



// db.marks.sync({alter:true})
// db.users.sync({alter : true});
// db.students.sync({alter:true});


module.exports = db;


