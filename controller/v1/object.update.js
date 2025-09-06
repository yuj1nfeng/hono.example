import utils from '#utils';
import npath from 'node:path';
import fs from 'node:fs/promises';

export const api_path = ':res/:id';
export const method = 'patch';
export const app = async (ctx) => {
    const id = ctx.req.param('id');
    const res = ctx.req.param('res');
    const body = await ctx.req.json();
    const schema_path = npath.join(process.cwd(), '.schema', `${res}.schema.js`);
    if (await fs.exists(schema_path)) {
        if (res === 'payment.record') {
            console.log('payment.record');
        }
        const { default: validate } = await import(schema_path);
        const { success, error } = validate.safeParse(body);
        if (!success) throw error;
    }
    const doc = await utils.mongo.findOne(res, id);
    if (!doc) throw new Error('404', '数据不存在');
    const result = await utils.mongo.updateOne(res, id, body);
    // todo: publish event
    return ctx.json(result);
};
