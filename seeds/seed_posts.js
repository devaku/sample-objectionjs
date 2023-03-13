const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('posts')
		.del()
		.then(() => knex.raw(`ALTER TABLE posts AUTO_INCREMENT = 1`))
		.then(function () {
			// Inserts seed entries
			return knex('posts').insert([
				{
					title: faker.word.noun(),
					user_id: faker.datatype.number({ min: 1, max: 3 }),
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quis minus tenetur nam dolorem mollitia officia voluptates at distinctio, illo odio accusantium optio deserunt ex reprehenderit inventore nobis natus harum!',
				},
				{
					title: faker.word.noun(),
					user_id: faker.datatype.number({ min: 1, max: 3 }),
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quis minus tenetur nam dolorem mollitia officia voluptates at distinctio, illo odio accusantium optio deserunt ex reprehenderit inventore nobis natus harum!',
				},
				{
					title: faker.word.noun(),
					user_id: faker.datatype.number({ min: 1, max: 3 }),
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod quis minus tenetur nam dolorem mollitia officia voluptates at distinctio, illo odio accusantium optio deserunt ex reprehenderit inventore nobis natus harum!',
				},
			]);
		});
};
