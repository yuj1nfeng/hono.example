import utils from '#utils';

const options = {
    outputDir: '.db',
    databaseUrl: process.env['SEQUELIZE_URL'],
    dialect: process.env['SEQUELIZE_DIALECT'],
    excludeTables: [],
};

await utils.cmd.genSeqSchema(options);
