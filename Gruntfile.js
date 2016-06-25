module.exports = function (grunt) {

	// Include grunt plugins
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Project config
	grunt.initConfig({
		postcss: {
			options: {
				map: true, // Inline sourcemaps
				processors: [
					require('postcss-import')(), // Import all stylesheets to one file
					require('postcss-cssnext')({browsers: 'last 2 versions'}) // Use future css today
				]
			}
		},
		cssmin: {
			target: {
				files: {
					'./public/dist/css/all.min.css': ['./public/main.css']
				}
			}
		},
		uglify: {
			dist: {
				files: {
					'./public/dist/js/all.min.js': [
						'./public/js/vendor/jquery-2.2.0.js',
						'./public/js/vendor/prism/prism.js',
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
	grunt.registerTask('css', ['postcss', 'cssmin']);
	grunt.registerTask('js', ['uglify']);
	grunt.registerTask('default', ['css', 'js']);
};

