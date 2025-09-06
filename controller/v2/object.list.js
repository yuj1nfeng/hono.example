import utils from '#utils';
export const api_path = ':res/list';
export const method = 'post';
export const app = async (ctx) => {
    const res = ctx.req.param('res');
    const page = ctx.req.query('page');
    const limit = ctx.req.query('limit') || 10;
    // const model = utils.sequelize.models.get(res.replaceAll('.', '_'));
    const model = utils.sequelize.models.get(res);
    if (!model) throw new Error('model not found');
    const filter = utils.cmd.buildSeqFilter(await ctx.req.json());
    if (page == undefined) return ctx.json(await model.findAll({ where: filter }));

    const skip = (page - 1) * limit;
    const result = await model.findAndCountAll({ where: filter, limit: limit, offset: skip });
    return ctx.json(result);
};
