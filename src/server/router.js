
const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
    console.log('ctx.path', ctx.path);
    ctx.body = 'Hello World';
    next();
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

