// requiring packages
var express		=	require('express'),
router		=	express.Router(),
User		=	require('../models/user'),
Quiz		=	require('../models/quiz'),
middleware 	=	require('../middleware');


// render the home page
router.get('/home', middleware.isLoggedIn, function(req, res) {
	Quiz.find({},"title author", function(err, allQuiz) {
		if(err) {
			req.flash('error', 'Something went wrong. Please try again.');
		} else {
			res.render('user/home', {quizzes: allQuiz});
		}
	});	

});

// render the profile page
router.get('/:id', middleware.isLoggedIn, function(req, res) {
	User.findById(req.params.id, function(err, foundUser) {
		if (err) {
			req.flash('error', 'Profile does not exist.');
			res.redirect('/user/home');
		} else {
			res.render('user/profile', {user: foundUser});
		}
	});
});

// Handles the post method of Postes
router.post('/addNewQuiz', middleware.isLoggedIn, function(req, res) {
	User.findById(req.user._id, function(error, foundUser) {
		if(error)
			req.flash('error', 'Something went wrong. Please try again.');
		else{
			var newQuiz = new Quiz({
				title : req.body.title,
				author : {
					id : req.user._id,
					name : foundUser.firstname + " " + foundUser.lastname,
					avatar : foundUser.avatar
				}
			});
			Quiz.create(newQuiz,function(err, newlyCreated){
				if(err) {
					req.flash('error', 'Something went wrong. Please try again.');
				} else {
					req.flash('success', 'Successfully created.');
					res.redirect('/quiz/addQuestions/' + newlyCreated._id);
				}
			})
		}
	});
});


module.exports 	=	router;