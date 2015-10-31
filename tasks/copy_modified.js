/*
 * grunt-request-upload
 * https://github.com/xzf158/grunt-request-upload
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