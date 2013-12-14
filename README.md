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

```
npm install grunt-search --save-dev
```

Once the plugin's been installed, you need to add this line of JS to your gruntfile:

```
grunt.loadNpmTasks('grunt-search');
```

That will reference this module and allow you to use it.


### Usage example

It's pretty straightforward to use.

```js
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
			logFile: "tmp/results.txt",
			logFormat: "text",
			failOnMatch: true
		}
	}
}
```

### Options

There are only four options. The `options` property can contain any of the following:

- *searchString*: (required) a string or regexp - the string to search for.
- *logFile*: (required) the location of the file to be created. This is relative to the grunt root.
- *logFormat*: (optional, defaults to `json`) the format of the log file: `json`, `xml` or `text`.
- *failOnMatch*: (optional, defaults to `false`). This option lets you choose to fail the build process if any matches
are found.

If either of the required parameters are omitted, the build will fail.

### License

MIT, baby.
