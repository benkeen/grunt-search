/*
 * grunt-search
 * https://github.com/benkeen/grunt-search
 *
 * Copyright (c) 2013 Ben Keen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// project configuration
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

		// before generating any new files, remove any previously-created files
		clean: {
			tests: ['tmp']
		},

		// configuration to be run (and then tested)
		search: {
			ben: {
				files: {
					src: ["*"]
				},
				options: {
					searchString: /WARRANTY/gi,
					logFile: "tmp/results.js",
					failOnMatch: true
				}
			}
		},

		// unit tests
		nodeunit: {
			tests: ['test/*_test.js']
		}
	});

	// actually load this plugin's task(s)
	grunt.loadTasks('tasks');

	// these plugins provide necessary tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	//grunt.loadNpmTasks('line-reader');

	// whenever the "test" task is run, first clean the "tmp" dir, then run this plugin's task(s), then test the result
	grunt.registerTask('test', ['clean', 'search', 'nodeunit']);

	// by default, lint and run all tests
	grunt.registerTask('default', ['jshint', 'test']);
};
