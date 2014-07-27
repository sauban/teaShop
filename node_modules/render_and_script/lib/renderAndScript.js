var path  = require('path'),
    jsdom = require('jsdom'),
    async = require('async'),
    _     = require('underscore');

// renderして、クライアントサイドのスクリプトを実行してから返す
var renderAndScript = function (view, options, scripts) {
	var self = this;
	var host = 'http://' + this.req.headers.host;

	scripts = scripts || [];

	// 実行する関数のリスト
	var scriptFns = _.select(scripts, function (script) {
		return typeof script == 'function';
	});

	// 関数実行の前に読み込むライブラリのリスト
	var scriptFiles = _.select(scripts, function (script) {
		return typeof script == 'string';
	});
	scriptFiles = _.map(scriptFiles, function (filepath) {
		return host + filepath;
	});


	async.waterfall([function (next) {
		// render engineによるレンダリング
		self.render(view, options, next);
	}, function (html, next) {
		// レンダリング結果をもとにjsdom環境を作る
		jsdom.env(html, scriptFiles, next);
	}, function(window, next) {
		// scriptを実行 実行後のwindowを次へ渡す

		async.forEachSeries(scriptFns, function (script, next) {
			script(window, function (err) {
				next(err);
			});
		}, function (err) {
			next(err, window);
		});

	}, function(window, next) {
		// windowからhtmlを再度取り出して、send
		var document = window.document;
		var result = [
			document._doctype._fullDT,
			document.outerHTML
		].join('\n');

		self.send(result);

		next();
	}], function (err) {
		if (err) {
			self.req.next(err);
		}
	});
};

// app.useで使われる設計
module.exports = function (req, res, next) {
	res.renderAndScript = renderAndScript;
	next();
};