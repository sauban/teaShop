var fs   = require('fs'),
    path = require('path'),
    util = require('util');

var runScriptFile = function (window, filepath, callback) {
	filepath = path.join(__dirname + '/../', filepath);

	if (!fs.existsSync(filepath)) {
		callback(new Error(util.format(
			'file not exists. (%s)',
			filepath
		)));
	}

	var script = fs.readFileSync(filepath, 'utf8');
	try {
		eval(script);
	} catch (err) {
		callback(err);
		return;
	}
	callback();
};

module.exports = runScriptFile;