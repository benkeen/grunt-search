## grunt-search

This is a Grunt plugin that searches a list of files for particular search strings and logs results in JSON, XML or text format.
It provides option to fail the build process.

### Use-case

There are a bunch of search-and-replace Grunt plugins out there, but we needed something simpler for logging purposes
only. We wanted to run various tests on our codebase to look for certain things: inline styles, inline event handlers,
old, unwanted HTML tags. None of these weren't significant enough to warrant failing the build, but they do give a
clue as the health of the codebase.

Basically, we run this function along with `jshint` in our dev environments to prevent the accumulation of crap. You
know how it goes.

### Installation

This plugin requires Grunt v0.4.1+.


### Usage example

```js
search: {
	default: {
		files: {
			src: ["*"]
		},
		options: {
			searchString: /WARR[^\s]*/g,
			logFile: "tmp/results.json",
			logFormat: "json"
			//failOnMatch: true
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
