import utils from '#utils';
import fs from 'node:fs/promises';

const model_dir = process.env['SEQUELIZE_SCHEMA_DIR'];
const output_dir = process.env['VALIDATE_SCHEMA_DIR'];

await fs.mkdir(output_dir, { recursive: true });

await utils.cmd.genZodSchema(model_dir, output_dir);
