
const Router = require('koa-router');
const router = new Router();
const assets = require('./util/assets');
const hello = require('./hello');

// if (process.env.NODE_ENV == 'local') {
//     require('babel-register')({
//         extensions: [".jsx", ".js"],
//         cache: false //热更新需要
//     })
// }

// const Home = require('../client/container/Home.jsx');
// const React = require('react');
// const ReactDOM = require('react-dom/server');
// console.log('### Home', Home);

async function getS() {
    const t = await Promise.resolve('foo');
    return t;
}

router.get('/', async (ctx, next) => {
    console.log('### sss');
    hello();
    const assetArr = assets();
    const entryJs = assetArr['home'] && assetArr['home']['js'];
    const reactJs = assetArr['react'] && assetArr['react']['js'];
    // const reactString = ReactDOM.renderToString(
    //     React.createElement(Home.default || '')
    // );

    const reactString = await getS();
    console.log('### reactString', reactString);
    console.log('ctx.path.?? ', ctx.path, assetArr, entryJs, reactJs);
    await ctx.render('entry', {
        reactString,
        reactJs,
        entryJs
    });
})

router.get('/a', async (ctx, next) => {
    console.log('ctx.path', ctx.path);
    const d = 'd';
    const a = await getS();
    const b = a + 'b' + d;
    console.log('##b', b);
    const c = a + ' ' + b;
    console.log('##c', b);
    ctx.body = 'Hello World a' + c;
    next();
})

router.get('/b', (ctx, next) => {
    console.log('ctx.path', ctx.path);
    ctx.body = 'Hello World b';
    next();
})

module.exports = router;

