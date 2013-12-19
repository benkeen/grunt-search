## grunt-search

This is a Grunt plugin that searches a list of files for particular search strings and logs the results in JSON, XML
or text format - or just output to the console. It also provides an option to fail the build process, should you need it.

### Use-case

There are a bunch of search-and-replace Grunt plugins out there, but we needed something simpler for logging purposes
only. We wanted to run various tests on our codebase to look for certain things: inline styles, inline event handlers,
old, unwanted HTML tags. None of these weren't significant enough to warrant failing the build, but they do give a
clue as the health of the codebase.

So basically, we run this function along with `jshint` in our dev environments to warn us about the accumulation of crap.

### Installation

This plugin requires Grunt v0.4.1+.

In your project folder, run the following command:

```js
npm install grunt-search --save-dev
```

Once the plugin has been installed, you need to add this line of JS to your gruntfile:

```js
grunt.loadNpmTasks('grunt-search');
```

That will reference this module and allow you to use it.


### Usage examples

If you're familiar with Grunt, it's pretty straightforward to use. Here's a few example searches so you can get the idea
of how it operates.

```js
grunt.initConfig({
    search: {

        // Example 1: search for inline style tags
        inlineStyles: {
            files: {
                src: ["*.html", "**/*.hbs"]
            },
            options: {
                searchString: /style\s?=\s?["']*/g,
                logFile: "tmp/results.json"
            }
        },

        // Example 2: look for any developers leaving obscenities in the codebase
        obscenities: {
            files: {
                src: ["*"]
            },
            options: {
                searchString: /(poop|fart|Barbara\sStreisand)/g,
                logFile: "tmp/results.xml",
                logFormat: "xml",
                failOnMatch: true,
                onMatch: function(match) {
                    // called when a match is made. The parameter is an object of the
                    // following structure: { file: "", line: X, match: "" }
                },
                onComplete: function(matches) {
                    // called when all files have been parsed for the target. The
                    // matches parameter is an object of the format:
                    // `{ numMatches: N, matches: {} }`. The matches /property is
                    // an object of filename => array of matches
                },
            }
        },

        // Example 3: search a PHP codebase for short-tags and just output the findings to
        // the console (short tags can be disabled, so this helps prevent them sneaking in!)
		short_tags: {
			files: {
				src: ["**/*.php"]
			},
			options: {
				searchString: /(<\?[^p])|(<\?$)/,
				logFormat: "console"
			}
		}
    }
});
```

### File matching

The `files` property should be an object with a single `src` property containing an array of files, or file patterns.
This plugin uses Grunt's file globbing patterns, documented here:
http://gruntjs.com/configuring-tasks


### Options

The `options` property can contain any of the following:

- *searchString*: (required) a string or regexp. This is the string you're looking for.
- *logFormat*: (optional, defaults to `json`) the format of the log file: `json`, `xml`, `text` or `console`.
- *logFile*: (required, unless logFormat is set to `console`) the location of the file to be created. Like all things with
Grunt, this is relative to the Grunt root.
- *failOnMatch*: (optional, defaults to `false`). This option lets you choose to fail the build process if any matches
are found.
- *outputExaminedFiles*: (optional) a boolean - default to `false`). Sometimes it's not totally clear what files are
being matched by the file globbing. When this option is set to `true`, the generated output file contains a list of the
files that had been examined.
- *onComplete*: (optional) a function. This is called when all file searching is complete. It's passed a single parameter.
An object of the following format: `{ numMatches: N, matches: {} }`. The matches property is an object of
filename => array of matches. Note: this function doesn't get called in the event of a fatal error (i.e. a required
options parameter wasn't properly included).
- *onMatch*: (optional) a function. This is called after each match is made. It's passed a single parameter - an object
with the following structure: `{ file: "", line: X, match: "" }`

Note: if either of the required parameters are omitted, the build will fail.

### Changelog

- 0.1.3 - Dec 18th. `console` logFile option value added for simply outputting results to console. Now the number of
matches is always output to the console regardless of logFile type, as well as being logged in the generated file.
- 0.1.2 - Dec 15th. Tests added, minor tweaks.
- 0.1.1 - Dec 14th. Bug fix for JSON report files.
- 0.1.0 - Dec 13th. Initial release.

### Things To Improve

- Each file being examined is loaded entirely into memory right now. From a memory perspective it would be better to
stream them in.
- Multi-line matches won't work.
- Better tests!

### License

MIT, baby.
