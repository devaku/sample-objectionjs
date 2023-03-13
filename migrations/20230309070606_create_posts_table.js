/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable('posts', function (table) {
		table.increments('id').primary();
		table.string('title', 1000).notNullable();
		table.string('content', 1000);
		table.integer('user_id');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('posts');
};
