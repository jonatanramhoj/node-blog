module.exports = function (grunt) {

	// Include grunt plugins
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	// Project config
	grunt.initConfig({
		postcss: {
			options: {
				map: true, // Inline sourcemaps
				processors: [
					require('postcss-import')(), // Import all stylesheets to one file
					require('postcss-cssnext')(), // Use future css today
					require('cssnano') // Minify the result
				]
			},
			dist: {
				files: [{
					dest: './public/dist/css/all.min.css',
					src: './public/main.css'
				}]
			}
		},
		requirejs: {
			dist: {
				options: {
					baseUrl: './public/js',
					mainConfigFile: './public/js/all.js',
					name: 'all',
					out: './public/dist/js/all.min.js'
				}
			}
		},
		watch: {
			css: {
				files: ['./public/**/*.css', '!./public/dist/**/*.css'],
				tasks: ['css']
			}
		}
	});

	// Register tasks
	grunt.registerTask('css', ['postcss']);
	grunt.registerTask('js', ['requirejs']);
	grunt.registerTask('default', ['css', 'js']);
};

