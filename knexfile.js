// Load ENVIRONMENT VARIABLES
// Go to the root of the folder
const rootpath = __dirname;
require('dotenv').config({ path: `${rootpath}/.env` });

module.exports = {
	development: {
		client: 'mysql',
		connection: {
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};
