import utils from '#utils';

export const api_path = ':res/:id';
export const method = 'get';
export const app = async (ctx) => {
    const id = ctx.req.param('id');
    const res = ctx.req.param('res');
    const cache_key = `${res}:${id}`;
    const exists = await utils.redis.exists(cache_key);
    if (exists) return ctx.text(await utils.redis.get(cache_key));
    // const model = utils.sequelize.models.get(res.replaceAll('.', '_'));
    const model = utils.sequelize.models.get(res);
    if (!model) throw new Error('model not found');
    const result = await model.findOne({ where: { id: id } });
    if (result != null) await utils.redis.set(cache_key, JSON.stringify(result.dataValues));
    return ctx.json(result.dataValues);
};
