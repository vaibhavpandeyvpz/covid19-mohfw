const Koa = require('koa');
const cors = require('@koa/cors');
const json = require('koa-json');
const level = require('level');

const app = new Koa();
const db = level('./covid.db', { valueEncoding: 'json' });
const mohfw = require('./mohfw');

setInterval(async () => {
    try {
        const counts = await mohfw();
        await db.put('counts', counts)
    } catch (ignore) {
    }
}, 15 * 60 * 1000);

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`)
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`)
});

app.use(cors());
app.use(json());

app.use(async ctx => {
    ctx.body = await db.get('counts')
});

app.listen(3000);
