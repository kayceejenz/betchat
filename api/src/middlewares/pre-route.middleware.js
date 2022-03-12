const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');
const cors = require("cors")

module.exports = (app) => {
     app.use(cors())
     app.use(helmet());
     app.use(morgan('dev'));
     app.use(express.json());
     app.use(express.static("/public/client"));
     app.use('/css', express.static(__dirname + '/public/client/css'));
     app.use('/js', express.static(__dirname + '/public/client/js'));
     app.use('/images', express.static(__dirname + '/public/client/images'));
     app.use(express.urlencoded({ extended: false }));
     app.use('/uploads', express.static("/uploads"));

     return app
}