const Koa = require('koa');
const chalk = require('chalk');
const router = require('./router');
const views = require('koa-views');
const koaStatic = require('koa-static');
const path = require('path');


const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../../config/webpack.config.base.js');
const compiler = webpack(config);

const koaWebpack = require('koa-webpack');

console.log('### process.env.NODE_ENV', process.env.NODE_ENV);
console.log('### process.env.TAF_ENV', process.env.TAF_ENV);

const app = new Koa();

const handler = async (ctx, next) =>{
	try{
		await next();
	}catch(e){
    console.log('### catch err', e)
		ctx.response.status = e.statusCode ||e.status ||500;
	}
}

app.use(handler);

app.use(koaStatic('static', {
  maxage: 1000 * 3600 * 24 * 30, // a month
}));

koaWebpack({ compiler })
  .then((middleware) => {
    console.log('### koaWebpack');
    app.use(middleware);
  }, err => {
    console.log(err)
  });

// app.use(webpackDevMiddleware(compiler, {
//   publicPath: '/dist/'
// }));

// app.use(webpackHotMiddleware(compiler));

app.use(views('.//static/view', {
  extension: 'pug'
}));

app.use(router.routes());

const port = process.env.PORT || 3006;
const host = process.env.IP || 'localhost';

app.listen(port, host, () => {
  console.info(chalk.red('==> ✅  Server is listening on %s:%d'), host, port);
});

// async function asy() {
//   const b = await new Promise(resolve => resolve('foo'));
//   // const c = await Promise.resolve('folo');
//   return 1 + b;
// }


var fs = require("fs");      //文件系统模块

function cleanCache(modulePath) {
    var module = require.cache[modulePath];
    // console.log('## require.cache', module);
    if (!module) {
        return;
    }
    console.log('## module.parent', module.parent.id);
    if (module.parent) {
        module.parent.children.splice(module.parent.children.indexOf(module), 1);
    }
    require.cache[modulePath] = null;
}

var watchFile = function (filepath) {
    var fullpath = require.resolve(filepath);
    fs.watch(fullpath,function(event,filename){
        if (event === "change") {
            cleanCache(fullpath);
            try {
                var routes = require(filepath);
                console.log("reload module",filename);
            } catch (ex) {
                console.error('module update failed');
            }
        }
    });
};

// var g_WatchFiles = ["../client/container/Home.jsx", './hello.js'];
// for (var i=0;i<g_WatchFiles.length;i++) {
//     watchFile(g_WatchFiles[i]);
// }