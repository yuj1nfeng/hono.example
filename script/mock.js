import mkyml from '#mock.yaml';

const res = process.argv.pop();

const data = await mkyml(`${process.env['MOCK_TEMPLATE_DIR']}/${res}.yml`);
console.log(data);
