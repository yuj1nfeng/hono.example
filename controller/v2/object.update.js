
import utils from '#utils';
import npath from 'node:path';
import fs from 'node:fs/promises';

export const api_path = ':res/:id';
export const method = 'patch';
export const app = async (ctx) => {
    const id = ctx.req.param('id');
    const res = ctx.req.param('res');
    const cache_key = `${res}:${id}`;
    await utils.redis.del(cache_key);
    const body = await ctx.req.json();
    const schema_path = npath.join(process.cwd(), '.schema', `${res}.schema.js`);
    if (await fs.exists(schema_path)) {
        const { default: validate } = await import(schema_path);
        const { success, error } = validate.safeParse(body);
        if (!success) throw error;
    }
    const service_path = npath.join(process.cwd(), 'service', `${res}.js`);
    if ((await fs.exists(service_path))) {
        const { update } = await import(service_path);
        if (!update) throw new Error('service not impament ');
        const result = await update({ ...body, id: id });
        return ctx.json(result);
    }
    const model = utils.sequelize.models.get(res);
    const [affectedCount] = await model.update(body, { where: { id: id } });
    // todo: publish event
    return ctx.json(affectedCount > 0);
};
