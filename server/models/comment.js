var models = require('../config/constants').models
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	body: { type: String, required: true },
	// description: { type: String },
	created: { type: Number, default: Date.now() },
	// Relations
	creatorId: { type: ObjectId, ref: models.user.name, required: true },
	taskId: { type: ObjectId, ref: models.task, required: true }
});

module.exports = mongoose.model(models.comment.name, schema);