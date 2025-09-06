import utils from '#utils';

export const api_path = ':res/:id';
export const method = 'delete';
export const app = async (ctx) => {
    const id = ctx.req.param('id');
    const res = ctx.req.param('res');
    // const model = utils.sequelize.models.get(res.replaceAll('.', '_'));
    const model = utils.sequelize.models.get(res);
    if (!model) throw new Error('model not found');
    const result = await model.findOne({ where: { id: id } });
    if (result == null) return ctx.json(false);
    await result.destroy();
    const cache_key = `${res}:${id}`;
    await utils.redis.del(cache_key);
    // todo: publish event
    return ctx.json(true);
};
