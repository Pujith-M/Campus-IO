// requiring packages
var express		=	require('express'),
	router		=	express.Router(),
	Quiz		=	require('../models/quiz'),
	middleware 	=	require('../middleware');

// Crating new quiz
router.get('/create', middleware.isLoggedIn, function(req, res) {
	res.render('quiz/Create');
});

// Adding questions to quiz
router.get('/addQuestions/:quizId', middleware.isLoggedIn, function(req, res) {
	res.render('quiz/addQuestions', {
		quizId : req.params.quizId,
		questionNo : 4//Quiz.findOne(req.params.quizId).questions.length
	});
});

// Adding the question to the quizz
router.post('/addQuestions/:quizId', middleware.isLoggedIn, function(req, res) {
	var newQuestion = {
		question : req.body.question,
		options : [
		{
			option : req.body.option1
		},
		{
			option : req.body.option2
		},	
		{
			option : req.body.option3
		},		
		{
			option : req.body.option4
		}],
		answer : req.body.answer
	};
	Quiz.update(
		{ _id: req.params.quizId },
		{ $push: { questions: newQuestion } },
		function(err, num) {});
		
	res.redirect('/quiz/addQuestions/' + req.params.quizId);
});


// Adding the title to the quizz
router.post('/create', middleware.isLoggedIn, function(req, res) {
	var newQuiz = new Quiz({
			title : req.body.title,
			author : {
				id : req.user._id,
				username : req.user.username
			}
	});
	Quiz.create(newQuiz,function(err, newlyCreated){
		if(err) {
			req.flash('error', 'Something went wrong. Please try again.');
		} else {
			req.flash('success', 'Successfully created.');
			//redirect to add questions
			res.redirect('/quiz/addQuestions/' + newlyCreated._id);
		}
	})
});



module.exports 	=	router;