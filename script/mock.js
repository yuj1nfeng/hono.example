import mkyml from '#mock.yaml';

const res = process.argv.pop();

const data = await mkyml(`.mock/${res}.yml`);
console.log(data);
