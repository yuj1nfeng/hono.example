import utils from '#utils';
import fs from 'node:fs/promises';

const model_dir = '.db';
const output_dir = `.schema`;

await fs.mkdir(output_dir, { recursive: true });

await utils.cmd.genZodSchema(model_dir, output_dir);
