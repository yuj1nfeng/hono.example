import fs from 'fs/promises';
import path from 'path';
const content = await fs.readFile(path.join('public/404.html'), 'utf-8');
export default async (ctx) => {
    if (ctx.req.method == 'GET') return ctx.html(content, 404);
    return ctx.json({ code: 404, message: 'not found' }, 404);
};
