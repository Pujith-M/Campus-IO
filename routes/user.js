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

module.exports 	=	router;