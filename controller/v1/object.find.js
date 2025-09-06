import utils from '#utils';

export const api_path = ':res/:id';
export const method = 'get';
export const app = async (ctx) => {
    const id = ctx.req.param('id');
    const res = ctx.req.param('res');
    const result = await utils.mongo.findOne(res, id);
    return ctx.json(result);
};
