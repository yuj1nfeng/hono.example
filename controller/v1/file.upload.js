import utils from '#utils';
import path from 'node:path';

export const api_path = 'file';
export const method = 'put';
export const app = async (ctx) => {
    const body = await ctx.req.parseBody();
    let file = body['file'];
    if (Array.isArray(file)) file = file[0];
    if (file.size == 0) throw new Error('file size is 0');
    const key = `${Bun.randomUUIDv7()}${path.extname(file.name)}`;
    await utils.s3.putFile(key, await file.arrayBuffer(), { type: file.type });
    const url = utils.s3.getPublicUrl(key);
    return ctx.json(url);
};
