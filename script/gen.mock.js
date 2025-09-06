import utils from '#utils';
const model_dir = '.db';
const output_dir = `.mock`;


await utils.cmd.genMockTemplate(model_dir, output_dir);
