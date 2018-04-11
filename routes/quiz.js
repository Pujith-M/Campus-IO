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
// router.get('/addQuestions/:quizId', middleware.isLoggedIn, function(req, res) {
router.get('/addQuestions/:quizId', function(req, res) {
	Quiz.findById(req.params.quizId, function(error, foundQuiz) {
		if(error)
			req.flash('error', 'Something went wrong. Please try again.');
		else{
			if(foundQuiz.author.id.equals(req.user._id)){
				res.render('quiz/addQuestions', {
					quizId : req.params.quizId,
					questionNo : foundQuiz.questions.length + 1
				});
			}
			else
				res.redirect('/user/home');
		}
	});
});

// Adding the question to the quizz
// router.post('/addQuestions/:quizId', middleware.isLoggedIn, function(req, res) {
	router.post('/addQuestions/:quizId', function(req, res) {
		var newQuestion = {
			question : req.body.question,
			answer : req.body[req.body.answer],
			options : []
		};
		for(var i=1;i<Object.keys(req.body).length - 1;i++){
			newQuestion.options.push({ option : req.body["option" + i]});
		}
		console.log(newQuestion);
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