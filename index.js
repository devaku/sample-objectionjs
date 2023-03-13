// Load ENVIRONMENT VARIABLES
// Go to the root of the folder
const rootpath = __dirname;
require('dotenv').config({ path: `${rootpath}/.env` });

const express = require('express');
const app = express();

/**
 * GET ALL
 */
app.get('/', async (req, res) => {
	const { User } = require('./models');
	try {
		const rows = await User.transaction(
			async (trx) => await User.query(trx)
		);
		res.json({
			status: 'success',
			message: 'Data successfully retrieved',
			data: rows,
		});
	} catch (e) {
		const { stack, message } = e;
		res.json({
			status: 'failure',
			message: 'There was an error in retrieving the data',
			data: {
				message,
				stack,
			},
		});
	}
});

/**
 * Find ONE
 */
app.get('/find', async (req, res) => {
	const { User } = require('./models');
	try {
		const rows = await User.transaction(
			async (trx) => await User.query(trx).findById(1)
		);
		res.json({
			status: 'success',
			message: 'Data successfully retrieved',
			data: rows,
		});
	} catch (e) {
		const { stack, message } = e;
		res.json({
			status: 'failure',
			message: 'There was an error in retrieving the data',
			data: {
				message,
				stack,
			},
		});
	}
});

/**
 * Find By Column
 */
app.get('/specific', async (req, res) => {
	const { User } = require('./models');
	try {
		const rows = await User.transaction(async (trx) => {
			// await User.query().where(`first_name`, '=', 'Savannah')
			// let result = await User.query().whereRaw(
			// 	`first_name = ?`,
			// 	'Savannah'
			// );

			let result = await User.query(trx).whereRaw(
				`first_name = ? || last_name = ?`,
				['Savannah', 'Hello']
			);

			return result;
		});

		res.json({
			status: 'success',
			message: 'Data successfully retrieved',
			data: rows,
		});
	} catch (e) {
		const { stack, message } = e;
		res.json({
			status: 'failure',
			message: 'There was an error in retrieving the data',
			data: {
				message,
				stack,
			},
		});
	}
});

/**
 * Use a RAW query
 */
app.get('/selectRaw', async (req, res) => {
	const { User } = require('./models');
	try {
		const rows = await User.transaction(async (trx) => {
			let result = await trx.raw(
				`
            SELECT 
                id as user_id,
                last_name
            FROM 
                users
            WHERE id = ?
            `,
				[2]
			);

			// Return only the RowDataPacket
			// Seems to be a byproduct of MySQL?
			return result[0];
		});

		res.json({
			status: 'success',
			message: 'Data successfully retrieved',
			data: rows,
		});
	} catch (e) {
		const { stack, message } = e;
		res.json({
			status: 'failure',
			message: 'There was an error in retrieving the data',
			data: {
				message,
				stack,
			},
		});
	}
});

app.get('/related', async (req, res) => {
	const { Post } = require('./models');
	try {
		const rows = await Post.transaction(
			// users is the name of the relation defined in the model

			// Basically saying: find the user, related to the post_ids of 1 and 2
			async (trx) =>
				await Post.relatedQuery('users', trx)
					.for([1, 2])
					.orderBy('id', 'desc')
		);
		res.json({
			status: 'success',
			message: 'Data successfully retrieved',
			data: rows,
		});
	} catch (e) {
		const { stack, message } = e;
		res.json({
			status: 'failure',
			message: 'There was an error in retrieving the data',
			data: {
				message,
				stack,
			},
		});
	}
});

app.get('/insert', async (req, res) => {
	const { User } = require('./models/User');
	try {
		const rows = await User.transaction(
			async (trx) =>
				await User.query(trx).insert({
					firstName: 'INSERTED FIRSTNAME',
					lastName: 'INSERTED LASTNAME',
				})
		);
		res.json({
			status: 'success',
			message: 'Data successfully inserted',
			data: rows,
		});
	} catch (e) {
		const { stack, message } = e;
		res.json({
			status: 'failure',
			message: 'There was an error.',
			data: {
				message,
				stack,
			},
		});
	}
});

app.get('/update', async (req, res) => {
	const { User } = require('./models');
	try {
		const rows = await User.transaction(
			async (trx) =>
				await User.query(trx)
					.patch({
						first_name: 'UPDATED FIRSTNAME',
						last_name: 'UPDATED LASTNAME',
					})
					.whereRaw('last_name = ?', ['lastname'])
		);
		res.json({
			status: 'success',
			message: 'Data successfully updated',
			data: rows,
		});
	} catch (e) {
		const { stack, message } = e;
		res.json({
			status: 'failure',
			message: 'There was an error.',
			data: {
				message,
				stack,
			},
		});
	}
});

app.get('/delete', async (req, res) => {
	const { User } = require('./models');
	try {
		const rows = await User.transaction(
			async (trx) =>
				await User.query(trx)
					.delete()
					.whereRaw('last_name = ?', ['UPDATED LASTNAME'])
		);

		if (rows == 0) {
			res.json({
				status: 'success',
				message: 'Nothing was deleted',
			});
		} else {
			res.json({
				status: 'success',
				message: 'The deletion was successful',
				data: rows,
			});
		}
	} catch (e) {
		const { stack, message } = e;
		res.json({
			status: 'failure',
			message: 'There was an error.',
			data: {
				message,
				stack,
			},
		});
	}
});

app.get('/', async (req, res) => {
	const { User } = require('./models/User');

	// Delete all persons from the db.
	await User.query().delete();

	// Insert one row to the database.
	await User.query().insert({
		firstName: 'Jennifer',
		lastName: 'Aniston',
	});

	// Read all rows from the db.
	const people = await User.query();

	console.log(people);
	res.json({
		status: 'hello',
	});
});

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
	console.log(`Express is listening at PORT: ${PORT}`);
});
