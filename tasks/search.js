/*
 * grunt-search
 * https://github.com/benkeen/grunt-search
 *
 * Copyright (c) 2013 Ben Keen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('search', 'Grunt plugin that searches a list of files for particular search strings and logs all findings in various formats.', function() {

		// merge task-specific and/or target-specific options with these defaults
		var options = this.options({
			searchString: null,
			logFile: null,
			logFormat: 'json', // json/xml/text
			failOnMatch: false
		});


		// validate the options
		if (!_validateOptions(options)) {
			return;
		}

		// if the searchString isn't a regular expression, convert it to one


		// now iterate over all specified file groups
		this.files.forEach(function(f) {

			// filter out invalid files and folders
			var filePaths = [];
			f.src.filter(function(filepath) {
				if (grunt.file.isDir(filepath)) {
					return;
				}

				// this was in the example, but it doesn't seem to even GET here if the file specified doesn't exist
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
				} else {
					filePaths.push(filepath);
				}
			});

			// now search the files for the search string. This is pretty poor from a memory perspective: it loads
			// the entire file into memory and runs the reg exp on it
			var matches = {};
			var numMatches = 0;
			for (var i=0; i<filePaths.length; i++) {
				var file = filePaths[i];
				var src = grunt.file.read(file);

				var lines = src.split("\n");
				for (var j=1; j<=lines.length; j++) {
					var lineMatches = lines[j-1].match(options.searchString);
					if (lineMatches) {
						if (!matches.hasOwnProperty(file)) {
							matches[file] = [];
						}
						matches[file].push(j);
						numMatches++;
					}
				}
			}

			// write the log file
			if (numMatches > 0) {
				_generateLogFile(options, matches);
				if (options.failOnMatch) {
					grunt.fail.fatal("Matches of " + options.searchString.toString() + " found");
				}
			}
		});

	});

	var _validateOptions = function(options) {
		var optionErrors = [];
		if (options.searchString === null) {
			optionErrors.push("Missing options.searchString value.");
		}
		if (options.logFile === null) {
			optionErrors.push("Missing options.logFile value.");
		}
		if (optionErrors.length) {
			for (var i=0; i<optionErrors.length; i++) {
				grunt.log.error("Error: ", optionErrors[i]);
			}
		}
		return optionErrors.length === 0;
	}

	var _generateLogFile = function(options, results) {
		//grunt.file.write(f.dest, src);
	};

};
