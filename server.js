var express = require('express');
var app = express();

var http = require('http').Server(app);
var path = require('path');
var port = process.env.PORT || 8080;

var moment = require('moment');

app.get('/:date', function(req, res) {

	if (req.params.date.replace(/\d/g, "") === "") {
			var naturalDate = moment(req.params.date, "X").format('LL');
			res.json(
				{"unix": req.params.date, "natural": naturalDate}
			)
			// pass on the unix date
	}

	else if (moment(req.params.date).isValid()) {	
			var naturalDate = moment(req.params.date, 'MMMM D, YYYY');
			var unixDate = naturalDate.unix();
			res.json(
				{"unix": unixDate, "natural": naturalDate.format('LL')}
			)
	} else { res.sendFile(path.resolve('./public/index.html')); }
})

http.listen(port, function() {
	console.log('listening on *:' + port);
});