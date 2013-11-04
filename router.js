var fs = require('fs');

var router = {};

var route = router.route = function(req, res) {
	if (req.url == "/") {
		console.log(req.url);
		console.log(req.url.pathname);
		sendFile("public/index.html", res);
	} else {
		console.log(req.url.slice(1));
		console.log(req.url.pathname);
		sendFile(req.url.slice(1), res);
	}
};

var sendFile = router.sendFile = function(filePath, res) {
	var file = fs.readFile(filePath, { encoding: 'utf8' }, function (err, data) {
		if (err) {
			res.writeHead(404);
		} else {
			// console.log(data.toString());
			res.write(data);
		}
		res.end()
	});
};

module.exports = router;