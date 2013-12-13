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
		if (!(options.searchString instanceof RegExp)) {
			options.searchString = new RegExp(options.searchString, "g");
		}

		// now iterate over all specified file groups
		this.files.forEach(function(f) {

			// filter out invalid files and folders
			var filePaths = [];
			f.src.filter(function(filepath) {
				if (grunt.file.isDir(filepath)) {
					return;
				}

				// *** this was in the gruntplugin example, but it doesn't seem to even GET here if the file specified
				// doesn't exist... ***
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
						matches[file].push({ line: j, match: lineMatches[0] });
						numMatches++;
					}
				}
			}

			// write the log file - even if there are no results. It'll just contain a "numResults: 0" which is useful
			// in of itself
			_generateLogFile(options, matches, numMatches);
			if (numMatches > 0 && options.failOnMatch) {
				grunt.fail.fatal("Matches of " + options.searchString.toString() + " found");
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
	};

	var _generateLogFile = function(options, results, numResults) {
		var content = '';

		if (options.logFormat === "json") {
			content = _getJSONLogFormat(options, results, numResults);
		} else if (options.logFormat === "xml") {
			content = _getXMLLogFormat(options, results, numResults);
		} else if (options.logFormat === "text") {
			content = _getTextLogFormat(options, results, numResults);
		}

		// remove the old file, in case it exists
		grunt.file.write(options.logFile, content);
	};


	/**
	 * This generates a JSON formatted file of the match results. Boy I miss templating. :-)
	 * @param options
	 * @param results
	 * @param numResults
	 * @returns {string}
	 * @private
	 */
	var _getJSONLogFormat = function(options, results, numResults) {
		var content = "{\n\t\"numResults\": " + numResults + ",\n"
			+ "\t\"creationDate\": \"" + _getISODateString() + "\",\n"
			+ "\t\"results\": {\n";

		var group = [];
		for (var file in results) {
			var groupStr = "\t\t\"" + file + "\": [\n";

			var matchGroup = [];
			for (var i=0; i<results[file].length; i++) {
				matchGroup.push("\t\t\t{\n"
					+ "\t\t\t\t\"lineNum\": " + results[file][i].line
					+ ",\n"
					+ "\t\t\t\t\"match\": "
					+ "\"" + results[file][i].match + "\""
					+ "\n\t\t\t}");
			}
			groupStr += matchGroup.join(",\n") + "\n";
			groupStr += "\t\t]"
			group.push(groupStr);
		}
		content += group.join(",\n");
		content += "\n\t}\n}";

		return content;
	};

	var _getXMLLogFormat = function(options, results, numResults) {

	};

	var _getTextLogFormat = function(options, results, numResults) {

	};

	var _getISODateString = function() {
		var d = new Date();
		function pad(n) {
			return n<10 ? '0'+n : n;
		}
		return d.getUTCFullYear()+'-'
			+ pad(d.getUTCMonth()+1)+'-'
			+ pad(d.getUTCDate()) +' '
			+ pad(d.getUTCHours())+':'
			+ pad(d.getUTCMinutes())+':'
			+ pad(d.getUTCSeconds())
	};
};