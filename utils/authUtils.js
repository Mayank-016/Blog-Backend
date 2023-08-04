const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

module.exports = {
    express,
    bcrypt,
    lodash: _,
    Joi,
    jwt,
};
