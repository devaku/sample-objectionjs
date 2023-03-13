const knexConfig = require('./knexfile');

const { Model } = require('objection');

// Initialize knex.
const knex = require('knex')(knexConfig.development);

// Bind all Models to the knex instance. You only
// need to do this once before you use any of
// your model classes.
Model.knex(knex);
