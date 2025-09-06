import utils from '#utils';
import npath from 'node:path';
import fs from 'node:fs/promises';

export const api_path = ':res';
export const method = 'post';
export const app = async (ctx) => {
    const res = ctx.req.param('res');
    const body = await ctx.req.json();

    const schema_path = npath.join(process.cwd(), '.schema', `${res}.schema.js`);
    if (await fs.exists(schema_path)) {
        const { default: validate } = await import(schema_path);
        const { success, error } = validate.safeParse(body);
        if (!success) throw error;
    }
    const service_path = npath.join(process.cwd(), 'service', `${res}.js`);
    if ((await fs.exists(service_path))) {
        const { create } = await import(service_path);
        if (!create) throw new Error('service not impament ');
        const result = await create(body);
        return ctx.json(result);
    }

    const model = utils.sequelize.models.get(res);
    body.id = utils.id.uuid();
    const result = await model.create(body);
    return ctx.json(result.dataValues);


};
