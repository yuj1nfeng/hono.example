import utils from '#utils';

export const api_path = ':res/:id';
export const method = 'delete';
export const app = async (ctx) => {
    const res = ctx.req.param('res');
    const id = ctx.req.param('id');
    const result = await utils.mongo.deleteOne(res, id);
    // todo: publish event
    return ctx.json(result);
};
