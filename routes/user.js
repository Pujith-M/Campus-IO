// requiring packages
var express		=	require('express'),
	router		=	express.Router(),
	User		=	require('../models/user'),
	Posts		=	require('../models/post'),
	middleware 	=	require('../middleware');


// render the home page
router.get('/home', middleware.isLoggedIn, function(req, res) {
	Posts.find({}, function(err, allPosts) {
		if(err) {
			req.flash('error', 'Something went wrong. Please try again.');
		} else {
			res.render('user/home', {posts: allPosts});
		}
	});
});

// render the chatroom page
router.get('/chatroom', middleware.isLoggedIn, function(req, res) {
	res.render('user/chatroom');
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

// handles the post method of Posts
router.get('/post/:id', middleware.isLoggedIn, function(req, res) {
	Quiz.findById(req.params.id, function(err, foundQuiz) {
		if (err) {
			req.flash('error', 'Quiz not found');
			res.redirect('/user/home');
		}
		else{
			User.findById(req.user._id, function(err, foundUser) {
				if (err) {
					req.flash('error', 'User not found');
					res.redirect('/user/home');
				}
				else
				{
					var post = {
						author: {
							id : foundUser._id,
							name : foundUser.firstname + foundUser.lastname,
							avatar: foundUser.avatar
						},
						title: foundQuiz.title,
						postId: foundQuiz._id,
					}
					Posts.create(post ,function(err, newlyCreated){
						if (err) {
							req.flash('error', 'Quiz already posted');
							res.redirect('/user/' + foundUser._id);
						}
						else{
							req.flash('success', 'Quiz sucessfully posted');
							res.redirect('/user/' + foundUser._id);
						}
					});
				}
			});
		}	
	});
});

module.exports 	=	router;