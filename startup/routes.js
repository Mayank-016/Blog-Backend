const express = require('express');
const userouter = require('../routes/usersMySQL');
const blogrouter = require('../routes/blogs');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/users', userouter);
    app.use('/api/blogs', blogrouter);
}