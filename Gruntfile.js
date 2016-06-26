module.exports = function (grunt) {

	// Include grunt plugins
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

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
		uglify: {
			dist: {
				files: {
					'./public/dist/js/all.min.js': [
						'./public/js/vendor/jquery-2.2.0.js',
						'./public/js/vendor/prism/prism.js',
						'./public/js/vendor/js.cookie.js',
						'./public/js/main.js'
					]
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
	grunt.registerTask('js', ['uglify']);
	grunt.registerTask('default', ['css', 'js']);
};

