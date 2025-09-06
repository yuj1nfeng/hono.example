import { Hono } from 'hono';
import fs from 'fs/promises';
import path from 'path';
import middleware from './middleware';
import '#sequelize.ext';
import '#hono.ext';
import utils from '#utils';

await utils.sequelize.defineModelsFromYaml('.db');


const app = new Hono();
app.use(middleware.logger);
app.notFound(middleware.notfound);
app.onError(middleware.error);
app.use(middleware.limit);
app.use(middleware.cors);
app.use(middleware.warp);

const root = path.join(import.meta.dirname, 'controller');
await app.register(root);
// const abs_root = path.isAbsolute(root) ? root : path.join(process.cwd(), root);
// const files = await fs.readdir(abs_root, { withFileTypes: true, recursive: true });
// for (const file of files.filter((p) => p.isFile())) {
//     const file_path = path.join(file.parentPath, file.name);
//     const dir_name = path.dirname(path.relative(root, file_path));
//     const pkg = await import(file_path);
//     const api_path = `/api/${dir_name}/${pkg.api_path}`;
//     app[pkg.method](api_path, pkg.app);
//     console.log(`\x1b[32m load router: ${pkg.method}\t${api_path} ✔\x1b[0m `);
// }

export default app;
