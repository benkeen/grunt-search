# grunt-search

## [INCOMPLETE]

Grunt plugin that searches a list of files for particular search strings and logs results in JSON, XML or text format.
It provides option to fail the build process.

### Use-case

There are a bunch of search-and-replace Grunt plugins out there, but we needed something simpler for logging purposes
only. We wanted to run various tests on our codebase to look for certain things: inline styles, inline event handlers. These
weren't significant enough to fail the build, but they do give a clue as the health of the codebase.

We run this function along with `jshint` in our dev environments to prevent accumulation of crap. You know how it goes.

### Installation

This plugin requires Grunt v0.4.1+.


### Usage example


### Options

There are only four options.


### License

MIT, baby.
