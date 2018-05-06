var mongoose = require('mongoose');

var quizSchema = new mongoose.Schema({
	title : {type: String, required: true},
	author: {
				id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User'
				},
				name: {type: String, required: true},
				avatar: {type: String, required: true}

	},
	questions : [
				{
					question : {type: String, required: true},
					options : [
						{
							option : {type: String}
						}
					],
					answer : {type: String, required: true}
				}
	]
});

module.exports = mongoose.model('Quiz', quizSchema);