import utils from '#utils';

await utils.sequelize.sync({
    force: true,
    logging: (sql, _) => utils.logger.info(sql),
});
await utils.sequelize.close();
console.log('done');
