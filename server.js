var express = require('express');
var app=express();
var bodyParser = require('body-parser');
var mongoose= require('mongoose');
mongoose.connect('mongodb://root:root@ds237700.mlab.com:37700/first_crud');
var User = require('./app/models/user');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port= process.env.PORT || 8080;


var router= express.Router();

//middleware to use for all requests

router.use(function(req,res,next){
	console.log('Something is happening.');
	next();
})



//routes

router.get('/',function(req,res){
res.json({message:'hooray!welcome to our api!'});
});

router.route('/users')
	.post(function(req,res){
		var user= new User();
		user.name= req.body.name;
		user.password=req.body.password;

		user.save(function(err){
			if(err)
				res.send(err);
			res.json({messgae : 'User Created !'});
		});
	})
	.get(function(req,res){
		User.find(function(err,users){
			if(err)
				res.send(err);

			res.json(users);
		});
	});

router.route('/users/:user_id')
	.get(function(req,res){

		User.findById(req.params.user_id, function(err,user){
			if(err)
				res.send(err);
			res.json(user);
		});
	})

	.put(function(req,res){

		User.findById(req.params.user_id,function(err,user){

			user.name= req.body.name;
			user.save(function(err){

				if(err)
					res.send(err);
				res.json({message:'User Updated!'});
			});
		});

	})

	.delete(function(req,res){

		User.remove({

			_id: req.params.user_id

		},function(err ,user){
			if(err)
				res.send(err);

			res.json({message: 'Successfully deleted'});
		});
	});








app.use('/api',router);

app.use('/',function(req,res){

	res.sendFile('D:/NodeApi/html/index.html');
});

app.listen(port);
console.log('Magic happens on port',+port);