const express = require('express');
const path = require('path');

const app = express();
const port = 8082;


//ASYNC FUNCTION
/*
async function example() {
	var a;
	for (var i=0; i < 10000000000; i += 1) {
		a = i;
	}
	console.log('For loop has finished');
}
let secondStatement = console.log("second Statement");
example();
*/


app.use(function(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.route('/endpoint')
    .get(function (req, res, next) {
        res.sendFile(path.join(__dirname, '/hello.html'));
        next();
    })
    .post(function (req, res, next) {
        console.log('I got a POST request');
        res.send('Hello from POST');
        next();
    })
    .get(function(req, res) {
        console.log("I did get a GET request");
    });



    app.route('/testroute')
    .get(function (req, res, next) {
        res.sendFile(path.join(__dirname, '/upload.html'));
        next();
    })
    .post(function (req, res, next) {
        console.log('I got a POST request');
        res.send('Hello from POST');
        //Response.write("<img src='/show' />");
        next();
    })
    
    .get(function(req, res) {
        console.log("I did get a GET request");
    });


app.listen(port, function() {
    console.log(`started server on port: ${ port }`);
});










/*
var querystring = require("querystring"),
fs = require("fs"),
formidable = require("formidable");

function start(response) {
	console.log("Request handler 'start' was called.");
	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" '+
	'content="text/html; charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" enctype="multipart/form-data" '+
	'method="post">'+'<input type="file" name="upload" multiple="multiple">'+
	'<input type="submit" value="Upload file" />'+
	'</form>'+
	'</body>'+
	'</html>';
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);response.end();
}

function upload(response, request) {
	console.log("Request handler 'upload' was called.");
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		fs.rename(files.upload.path, "/tmp/test.png", 
		function(error) {
			if (error) {
				fs.unlink("/tmp/test.png");
				fs.rename(files.upload.path, "/tmp/test.png");
			}
		});
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response) {
	console.log("Request handler 'show' was called.");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream("/tmp/test.png").pipe(response);
}
exports.start = start;
exports.upload = upload;
exports.show = show;


*/





