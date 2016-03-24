var express = require('express');
var app = express();

var http = require('http').Server(app);
var path = require('path');
var port = process.env.PORT || 8080;

var moment = require('moment');

app.get('/', function(req, res) {
	res.sendFile(path.resolve('./public/index.html'));
})

app.get('/:date', function(req, res) {
	var inputDate = req.params.date;

	// if input is a unix date
	if (inputDate.replace(/\d/g, "") === "") {
		var naturalDate = moment(inputDate, "X").format('LL');
		if (inputDate.length === 10) {
			res.json(
				{"unix": inputDate, "natural": naturalDate}
			)
		}
		else {
			res.json(
				{"unix": null, "natural": null}
			)
		}
	}

	// if input is a natural date string
	else if (moment(inputDate).isValid()) {	
		var naturalDate = moment(inputDate, 'MMMM D, YYYY');
		var unixDate = naturalDate.unix();
		res.json(
			{"unix": unixDate, "natural": naturalDate.format('LL')}
		)
	} 
	else { res.json({"unix": null, "natural": null}) }
	//else { res.sendFile(path.resolve('./public/index.html')); }
})

http.listen(port, function() {
	console.log('listening on *:' + port);
});