'use strict';

const webpack = require('webpack');
const config = require('../config/webpack.config.base');

webpack(config, (info) => {
    console.log('info', info);
})