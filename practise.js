var express = require('express');

//when using POST method
var bodyParser = require('body-parser');

var app = express();

//create 
var urlencodedParser = bodyParser.urlencoded({ extended: false })




//rendering simply in browser
app.get('/',function(req,res)
{
res.send('This my home page');
});


//sending practise.html page which is without css
app.get('/',function(req,res)
{
res.sendFile(__dirname + '/practise.html');
});

 
//getting dynamic string name poping up in the URL
app.get('/profile/:name',function(req,res){
res.send('You are viewing profile of '+req.params.name);
});


// setting ejs as view engine
app.set('view engine','ejs');
app.set('views', __dirname +"/views");


//using express.static((built-in middleware of express) to render static files
app.use('/whatever',express.static('CssFile'));


//rendering practise.ejs page using any static name in url
app.get('/ejs1',function(req,res){
res.render('./practise.ejs');
});


//rendering practise.ejs page with dynamic url using "name" property
app.get('/ejs2/: name',function(req,res){
res.render('./practise.ejs', {person: req.params.name});
});


//rendering practise.ejs page with multiple properties
app.get('/ejs3/:name',function(req,res){
    /*creating object*/
    var data = { age:27, profession:'HR'};
    res.render('./practise.ejs',{person: req.params.name, data: data});
});


//with partial views
app.get('/contact',function(req,res)
{
res.render('./contact.ejs');
});

//using query string

//dynamic url values are consoled using qs
   app.get('/pre',function(req,res){
   console.log(req.query);
    res.render('./profile.ejs');
});

//dynamic url values will be printed in form input field using qs
app.get('/pre',function(req,res){
    res.render('./profile.ejs',{qs: req.query});
});

//dynamic url values will be printed in form input field and consoled too using
app.get('/pre',function(req,res){
    console.log(req.query);
    res.render('./profile.ejs',{ qs: req.query });
});


//for submitting form to the server
app.post('/pre',urlencodedParser,function(req,res){
    console.log(req.body);
    res.render('./profile.ejs',{ qs: req.query });
});


//this will diplay success page after form submission to the server
app.post('/pre',urlencodedParser,function(req,res){
    console.log(req.body);
    res.render('./contact-success.ejs',{ data: req.body });
});

//setting server at port 9800
app.listen(1000);
console.log('Server has started');