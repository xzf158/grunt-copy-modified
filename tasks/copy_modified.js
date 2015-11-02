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
		path = require('path'),
		md5 = require('md5-file');

	grunt.registerMultiTask('copy_modified', 'Grunt copy plugin, only copy modified files', function () {
		var done = this.async();
		var scope = this;
		this.data.files = grunt.util.kindOf(this.data.files) === 'array' ? this.data.files : [this.data.files];
		var verbose = !!this.data.verbose;
		var debug = !!this.data.debug;
		copyModified(0, copyModified);
		// console.log(scope.data);

		function copyModified(index, next) {
			if (!scope.data.files[index]) {
				done();
				return;
			}
			var orig = scope.data.files[index];
			var patterns = grunt.util.kindOf(orig.src) === 'array' ? (orig.src.length > 1 ? '{' + orig.src.join(',') + '}' : orig.src[0]) : orig.src;
			var dest = orig.dest;
			var cwd = orig.cwd ? orig.cwd : '.';

			var ignore = orig.ignore;
			if (debug) {
				grunt.log.subhead('Start index: ' + index);
				grunt.log.writeln('patterns: ', patterns);
				grunt.log.writeln('cwd: ', cwd);
				grunt.log.writeln('ignore: ', ignore);
				grunt.log.writeln('nodir: ', !!scope.data.nodir);
				grunt.log.writeln('dot: ', !!scope.data.dot);
				grunt.log.writeln('expand: ', !!scope.data.expand);
				grunt.log.writeln('dest: ', dest);
			}
			glob(patterns, {
					cwd: cwd,
					nodir: !!scope.data.nodir,
					dot: !!scope.data.dot,
					expand: !!scope.data.expand,
					ignore: ignore
				},
				function (err, files) {
					if (err) {
						grunt.fail.warn(err);
						index++;
						if (typeof next === 'function') {
							next(index, next);
						}
						return;
					}
					var filesmd5 = path.resolve('.', ".filesmd5");
					var filesMd5;
					try {
						filesMd5 = grunt.file.readJSON(filesmd5);
					} catch (e) {
						filesMd5 = {};
					}
					for (var i = 0, il = files.length; i < il; i++) {
						var srcPath = path.resolve(cwd, files[i]);
						var newerPath = path.resolve(dest, files[i]);
						var filemd5 = md5(srcPath);
						if (filesMd5[files[i]] !== filemd5) {
							filesMd5[files[i]] = filemd5;
							grunt.file.copy(srcPath, newerPath);
							if (verbose || debug) {
								grunt.log.ok(srcPath + ' -> ' + newerPath);
							}
						}
					}
					grunt.file.write(filesmd5, JSON.stringify(filesMd5));
					index++;
					if (typeof next === 'function') {
						next(index, next);
					}
				});
		}
	});
};