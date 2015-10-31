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

	grunt.registerMultiTask('copy_modified', 'Upload files through POST/PUT HTTP request', function () {

	});
};