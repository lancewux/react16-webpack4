const Koa = require('koa');
const chalk = require('chalk');
const router = require('./router');


const app = new Koa();

app.use(router.routes());

const port = process.env.PORT || 3006;
const host = process.env.IP || 'localhost';

app.listen(port, host, () => {
  console.info(chalk.red('==> ✅  Server is listening on %s:%d'), host, port);
});