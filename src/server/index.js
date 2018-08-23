const Koa = require('koa');
const chalk = require('chalk');
const router = require('./router');
const views = require('koa-views');
const koaStatic = require('koa-static');
const path = require('path');


const app = new Koa();

app.use(koaStatic('static', {
  maxage: 1000 * 3600 * 24 * 30, // a month
}));

app.use(views('.//static/view', {
  extension: 'pug'
}));

app.use(router.routes());

const port = process.env.PORT || 3006;
const host = process.env.IP || 'localhost';

app.listen(port, host, () => {
  console.info(chalk.red('==> ✅  Server is listening on %s:%d'), host, port);
});