'use strict';

const { Model } = require('objection');

class Post extends Model {
	// Table name is the only required property.
	static get tableName() {
		return 'posts';
	}

	static get relationMappings() {
		const User = require('./User');

		return {
			users: {
				relation: Model.BelongsToOneRelation,
				modelClass: User,
				join: {
					from: 'posts.user_id',
					to: 'users.id',
				},
			},
		};
	}
}

module.exports = Post;
