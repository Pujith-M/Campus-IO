// var mongoose = require('mongoose');

// var resultScheme = new mongoose.Schema({
//     quizId : {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: 'Quiz'
//                 },
//     quizTaken : [
//         name : {type: String, required: true},
//         userId : {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: 'User'
//                 }, 
//         score : {type: number, required: true, default : 0.0}        
//     ]
// });

// module.exports = mongoose.model('Result', resultScheme);