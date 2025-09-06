import utils from '#utils';
const model_dir = process.env['SEQUELIZE_SCHEMA_DIR'];
const output_dir = process.env['MOCK_TEMPLATE_DIR'];


await utils.cmd.genMockTemplate(model_dir, output_dir);
