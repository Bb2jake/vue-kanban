var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId
let Lists = require('./list');

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
	creatorId: { type: ObjectId, ref: models.user.name, required: true },
	collaborators: [{ type: ObjectId, ref: models.user.name }]
});

schema.pre('remove', next => {
	Lists.remove({ boardId: this._id }).exec();
	next();
})

module.exports = mongoose.model(models.board.name, schema);