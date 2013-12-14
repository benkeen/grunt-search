## grunt-search

This is a Grunt plugin that searches a list of files for particular search strings and logs results in JSON, XML or text format.
It provides option to fail the build process.

### Use-case

There are a bunch of search-and-replace Grunt plugins out there, but we needed something simpler for logging purposes
only. We wanted to run various tests on our codebase to look for certain things: inline styles, inline event handlers,
old, unwanted HTML tags. None of these weren't significant enough to warrant failing the build, but they do give a
clue as the health of the codebase.

So basically, we run this function along with `jshint` in our dev environments to prevent the accumulation of crap.


### Installation

This plugin requires Grunt v0.4.1+.

In your project folder, run the following command [N.B. this won't work yet - once I complete + submit the code to
npm, it will. I'll remove this comment then].

```js
npm install grunt-search --save-dev
```

Once the plugin's been installed, you need to add this line of JS to your gruntfile:

```js
grunt.loadNpmTasks('grunt-search');
```

That will reference this module and allow you to use it.


### Usage example

It's pretty straightforward to use. Here are a couple of targets, that illustrate how to look for inline styles and
check your codebase for rude words, slipped in by unruly developers.

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
                    // called when a match is made. The parameter is an object of the following structure:
                    // { file: "", line: X, match: "" }
                },
                onFinish: function(matches) {
                    // called when all files have been parsed for the target. The matches parameter is an
                    // object of filename to array of match information
                },
            }
        }
    }

### Options

The `options` property can contain any of the following:

- *searchString*: (required) a string or regexp - the string to search for.
- *logFile*: (required) the location of the file to be created. This is relative to the grunt root.
- *logFormat*: (optional, defaults to `json`) the format of the log file: `json`, `xml` or `text`.
- *failOnMatch*: (optional, defaults to `false`). This option lets you choose to fail the build process if any matches
are found.
- *onComplete*: (optional) a function.
- *onMatch*: (optional) a function.

If either of the required parameters are omitted, the build will fail.

### Changelog

- 0.1.0 - Dec 14th. Initial release.
    
### Things To fix

- "searchString" is a pretty poor property name.
- need to escape double-quotes in JSON file
- each file is loaded entirely into memory right now. Be better to stream it in, from a memory perspective.
- multi-line matches won't work.

### License

MIT, baby.
