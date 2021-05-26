'use strict';
// get sequelize
import { Sequelize } from 'sequelize-typescript'
import env from 'config/env'

import Admin from 'models/admin.model'

const { DB_NAME, DB_USER_NAME, DB_PASSWORD, DB_HOST } = env.DB_CONFIG

const sequelize = new Sequelize({
    database: DB_NAME,
    username: DB_USER_NAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    logging: false,
    dialect: 'mysql',
    models: [Admin]
});


export const sync = async () => {
    await sequelize.authenticate().then(async () => {
        try {
            console.log('database connection success');
            await sequelize.sync();
        } catch (err) {
            console.error('database sycn failed');
            console.error(err);
        }
        return
    });
}