var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	title : {type: String, required: true},
	author : {
				id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User'
				},
				name: {type: String, required: true},
				avatar: {type: String, required: true}

	},
	post : {
		type : {type: String, default: "Quiz"},
		id : type: mongoose.Schema.Types.ObjectId
	}
});

module.exports = mongoose.model('Post', postSchema);