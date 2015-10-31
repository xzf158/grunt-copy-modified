# grunt-copy-modified [![NPM version](https://badge.fury.io/js/grunt-copy-modified.png)](http://badge.fury.io/js/grunt-copy-modified)


> Grunt copy plugin, only copy modified files. using [node-glob](https://github.com/isaacs/node-glob)!

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-copy-modified --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-copy-modified');
```

## The "copy_modified" task

### Overview
In your project's Gruntfile, add a section named `copy_modified` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	copy_modified: {
		your_target: {
			files: [{
					src: ['path/**/*.js', 'path/**/*.css'],
					dest: 'dest/',
					ignore: ['**/*.less', '**/*.scss', '**/*.coffee']
				}, // includes files in path and its subdirs
				{
					cwd: 'path',
					src: ['**/*.js', '**/*.css'],
					dest: 'dest',
					ignore: ['**/*.less', '**/*.scss']
				} // makes all src relative to cwd 
			],
			verbose: true,
			expand: true,
			debug: false,
			dot: false,
			nodir: true
		}
	},
});
```

### Usage Examples

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
	copy_modified: {
		your_target: {
			files: [{
					cwd: 'dev',
					src: ['**/*.js', '**/*.css', '**/*.html'],
					dest: 'dest',
					ignore: ['**/*.less', '**/*.scss', '**/*.coffee']
				} // makes all src relative to cwd 
			],
			verbose: false,
			expand: true,
			debug: false,
			dot: false,
			nodir: true
		}
	},
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
