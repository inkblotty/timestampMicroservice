var express = require('express');
var app = express();

var http = require('http').Server(app);
var path = require('path');
var port = process.env.PORT || 8080;

var moment = require('moment');

app.get('/:date', function(req, res) {
	var queryDate = new Date(req.params.date);
	console.log(queryDate);

	if (queryDate !== 'Invalid Date') {
		var unixDate = moment.unix(moment(queryDate));
		var naturalDate = moment(queryDate, "MM DD, YYYY");
		res.json(
			{"unix": unixDate, "natural": naturalDate}
		)
	}
	else { res.send('hi'); }
})

http.listen(port, function() {
	console.log('listening on *:' + port);
});