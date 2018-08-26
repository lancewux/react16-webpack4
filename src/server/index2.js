const Koa = require('koa');
const chalk = require('chalk');
const router = require('./router2');
const views = require('koa-views');
const koaStatic = require('koa-static');
const path = require('path');


// const webpack = require('webpack');
// const webpackDevMiddleware = require('koa-webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const config = require('../../config/webpack.config.base.js');
// const compiler = webpack(config);

// const koaWebpack = require('koa-webpack');

console.log('### process.env.NODE_ENV', process.env.NODE_ENV);
console.log('### process.env.TAF_ENV', process.env.TAF_ENV);

const app = new Koa();

app.use(async (ctx, next) => {
  console.log('## sssgg');
  // const refer = ctx.request.headers.referer || ctx.request.headers.origin;
  // const urlObj = url.parse(refer);
  ctx.set({
    'Access-Control-Allow-Origin': `http://localhost:3006`,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  });
  await next();
})


app.use(koaStatic('static', {
  maxage: 1000 * 3600 * 24 * 30, // a month
}));

// koaWebpack({ compiler })
//   .then((middleware) => {
//     console.log('### koaWebpack');
//     app.use(middleware);
//   }, err => {
//     console.log(err)
//   });

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: '/dist/'
// }));

// app.use(webpackHotMiddleware(compiler));

app.use(views('.//static/view', {
  extension: 'pug'
}));

app.use(router.routes());

const port = process.env.PORT || 3007;
const host = process.env.IP || 'localhost';

process.app = 'app';
app.listen(port, host, () => {
  console.info(chalk.red('==> ✅  Server is listening on %s:%d'), host, port);
});

// async function asy() {
//   const b = await new Promise(resolve => resolve('foo'));
//   // const c = await Promise.resolve('folo');
//   return 1 + b;
// }
