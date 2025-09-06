import utils from '#utils';
import fs from 'node:fs/promises';
import npath from 'node:path';

export const api_path = ':res';
export const method = 'post';
export const app = async (ctx) => {
    const res = ctx.req.param('res');
    let body = await ctx.req.json();
    const schema_path = npath.join(process.cwd(), '.schema', `${res}.schema.js`);
    if (await fs.exists(schema_path)) {
        if (res === 'payment.record') {
            console.log('payment.record');
        }
        const { default: validate } = await import(schema_path);
        const { success, error } = validate.safeParse(body);
        if (!success) throw error;
    }

    const result = await utils.mongo.insertOne(res, body);
    // todo: publish event
    return ctx.json(result);
};
