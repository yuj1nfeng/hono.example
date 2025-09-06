import utils from '#utils';

const options = {
    outputDir: process.env['SEQUELIZE_SCHEMA_DIR'],
    databaseUrl: process.env['SEQUELIZE_URL'],
    dialect: process.env['SEQUELIZE_DIALECT'],
    excludeTables: [],
};

await utils.cmd.genSeqSchema(options);
