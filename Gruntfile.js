module.exports = function (grunt) {

	// Include grunt plugin
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Project config
	grunt.initConfig({
		postcss: {
			options: {
				map: true, // Inline sourcemaps
				processors: [
					require('postcss-import')(), // Import all stylesheets to one file
					require('autoprefixer')({browsers: 'last 2 versions'}), // Add vendor prefixes
					require('cssnano')() // Minify the result
				]
			},
			dist: {
				files: [{
					dest: './public/dist/css/all.min.css',
					src: './public/css/main.css'
				}]
			}
		},
		uglify: {
			dist: {
				files: {
					'./public/dist/js/all.min.js': ['./public/js/*.js']
				}
			}
		}
	});

	// Register tasks
	grunt.registerTask('default', ['postcss', 'uglify']);
};

