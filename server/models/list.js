var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId
let Tasks = require('./task')

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	created: { type: Number, default: Date.now() },
	// Relations
	creatorId: { type: ObjectId, ref: models.user.name, required: true },
	boardId: { type: ObjectId, ref: models.board, required: true }
});

schema.pre('remove', next => {
	Tasks.remove({ listId: this._id }).exec();
	next();
})

module.exports = mongoose.model(models.list.name, schema);