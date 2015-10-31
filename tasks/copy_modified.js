/*
 * grunt-copy-modified
 * https://github.com/xzf158/grunt-copy-modified
 *
 * Copyright (c) 2015 Terry Xu
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function (grunt) {
	var glob = require("glob"),
		fs = require('fs-extra'),
		path = require('path'),
		md5 = require('md5-file');

	grunt.registerMultiTask('copy_modified', 'Grunt copy plugin, only copy modified files', function () {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			files: [{
				expand: true,
				dot: false,
				cwd: '',
				src: [
					'**/*.*',
					'!**/*.less',
					'!**/*.coffee'
				],
				dest: ''
			}]
		});

		grunt.verbose.writeflags(options, 'Options');
		console.log(options.files);
		return;
		// Tell Grunt this task is asynchronous.
		// var done = this.async();
		glob('{js/lib/*.js,styles/**/*.css}', {
				cwd: src,
				nodir: true,
				dot: false,
				nonull: true,
				// ignore: ['**/*.map', '**/*.less', '**/*.coffee']
			},
			function (er, files) {
				// files is an array of filenames.
				// If the `nonull` option is set, and nothing
				// was found, then files is ["**/*.js"]
				// er is an error object or null.
				console.log(files);
				for (var i = 0, il = files.length; i < il; i++) {
					var srcPath = path.resolve(src, files[i]);
					var newerPath = path.resolve(newer, files[i]);
					var filemd5 = md5(srcPath);
					if (filesMd5[files[i]] !== filemd5) {
						fs.ensureFileSync(newerPath);
						filesMd5[files[i]] = filemd5;
						fs.copySync(srcPath, newerPath);
						console.log(srcPath + ' -> ' + newerPath);
					}
				}
				fs.outputJson('.filesmd5', filesMd5);
			});
		// done();
	});
};