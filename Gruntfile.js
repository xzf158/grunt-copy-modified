/*
 * grunt-copy-modified
 * https://github.com/xzf158/grunt-copy-modified
 *
 * Copyright (c) 2015 Terry
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp']
		},

		// Configuration to be run (and then tested).
		copy_modified: {
			default_options: {
				files: [{
						src: ['path/**/*.js', 'path/**/*.css'],
						dest: 'dest/',
						ignore: ['**/*.less', '**/*.scss', '**/*.coffee']
					}, // includes files in path and its subdirs
					{
						cwd: '/Users/terry/Documents/GitProjects/NYT_Aetna_Sponsored_Page/toClient/dev',
						src: ['**/*.js', '**/*.css'],
						dest: 'dest1/',
						ignore: ['**/*.less', '**/*.scss']
					} // makes all src relative to cwd 
				],
				verbose: true,
				expand: true,
				// debug: true,
				dot: false,
				nodir: true
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js']
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'copy_modified', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

	grunt.registerTask('dev', ['clean', 'copy_modified:default_options']);

};