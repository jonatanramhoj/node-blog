// Make good looking paths
requirejs.config({
	paths: {
		'main': 'main',
		'jquery': 'vendor/jquery-2.2.0',
		'cookie': 'vendor/cookie',
		'prism': 'vendor/prism/prism'
	}
});

// Require all scripts
requirejs(['main', 'cookie', 'prism']);