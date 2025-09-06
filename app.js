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

export default app;
