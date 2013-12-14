## grunt-search

This is a Grunt plugin that searches a list of files for particular search strings and logs the results in JSON, XML
or text format. It also provides an option to fail the build process, should you need it.

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


### Usage example

If you're familiar with Grunt, it's pretty straightforward to use. Here are a couple of targets that illustrate how
to look for inline styles and check your codebase for rude words, slipped in by unruly developers.

```js
grunt.initConfig({
    search: {

        // inline style tags
        inlineStyles: {
            files: {
                src: ["*.html", "**/*.hbs"]
            },
            options: {
                searchString: /style\s?=\s?["']*/g,
                logFile: "tmp/results.json"
            }
        },

        // look for any developers adding obscenities in the codebase
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
                onFinish: function(matches) {
                    // called when all files have been parsed for the target. The
                    // matches parameter is an object of the format:
                    // `{ numMatches: N, matches: {} }`. The matches /property is
                    // an object of filename => array of matches
                },
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
- *logFile*: (required) the location of the file to be created. Like all things with Grunt, this is relative to the
Grunt root.
- *logFormat*: (optional, defaults to `json`) the format of the log file: `json`, `xml` or `text`.
- *failOnMatch*: (optional, defaults to `false`). This option lets you choose to fail the build process if any matches
are found.
- *outputExaminedFiles*: (optional) a boolean - default to `false`). Sometimes it's not totally clear what files are
being matched by the file globbing. When this option is set to `true`, the generated output file contains a list of the
files that had been examined.
- *onComplete*: (optional) a function. This is called when all file searching is complete. It's passed a single parameter.
An object of the following format: `{ numMatches: N, matches: {} }`. The matches property is an object of
filename => array of matches. Note: this function doesn't get called with a fatal error (namely: a required parameter
isn't included).
- *onMatch*: (optional) a function. This is called after each match is made. It's passed a single parameter - an object
with the following structure: `{ file: "", line: X, match: "" }`

Note: if either of the required parameters are omitted, the build will fail.

### Changelog

- 0.1.1 - Dec 14th. Bug fix for JSON report files.
- 0.1.0 - Dec 13th. Initial release.

### Things To Improve

- Each file is loaded entirely into memory right now. From a memory perspective it would be better to stream them in.
- Multi-line matches won't work.
- Tests currently incomplete.

### License

MIT, baby.
