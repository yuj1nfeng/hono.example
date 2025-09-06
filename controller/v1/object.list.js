import utils from '#utils';
export const api_path = ':res/list';
export const method = 'post';
export const app = async (ctx) => {
    const res = ctx.req.param('res');
    const page = ctx.req.query('page');
    const limit = ctx.req.query('limit') || 10;
    const filter = utils.cmd.buildMongoFilter(await ctx.req.json());
    if (page == undefined) return ctx.json(await utils.mongo.query(res, filter));
    const skip = (page - 1) * limit;
    const result = await utils.mongo.paginate(res, filter, parseInt(limit), skip);
    return ctx.json(result);
};
