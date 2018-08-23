import Home from '../client/container/Home.jsx';
import React from 'react';
import { renderToString } from 'react-dom/server';

const Router = require('koa-router');
const router = new Router();
const assets = require('./util/assets');


router.get('/', async (ctx, next) => {
    const assetArr = assets();
    const entryJs = assetArr['home']['js'];
    const reactJs = assetArr['react']['js'];
    const reactString = renderToString(<Home/>);
    // const reactString = '';
    console.log('ctx.path', ctx.path, assetArr, entryJs, reactJs);
    await ctx.render('entry', {
        reactString,
        reactJs,
        entryJs
    });
})

router.get('/a', (ctx, next) => {
    console.log('ctx.path', ctx.path);
    ctx.body = 'Hello World a';
    next();
})

router.get('/b', (ctx, next) => {
    console.log('ctx.path', ctx.path);
    ctx.body = 'Hello World b';
    next();
})

module.exports = router;

