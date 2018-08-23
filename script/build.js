'use strict';

const webpack = require('webpack');
const configDll = require('../config/webpack.config.dll');
const config = require('../config/webpack.config.base');

webpack(configDll, (info) => {
    console.log('info', info);
    webpack(config, (info) => {
        console.log('info', info);
    })
})

// webpack(config, (info) => {
//     console.log('info', info);
// })