'use strict';

var gulp = require('gulp'),
	run = require('gulp-run'),
	watch = require('gulp-watch'),
	// prefixer = require('gulp-autoprefixer'),
	// uglify = require('gulp-uglify'),
	// sass = require('gulp-sass'),
	// sourcemaps = require('gulp-sourcemaps'),
	// rigger = require('gulp-rigger'),
	// cssmin = require('gulp-minify-css'),
	// imagemin = require('gulp-imagemin'),
	// pngquant = require('imagemin-pngquant'),
	// rimraf = require('rimraf'),
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var path = {
	watch: {
		qml: './src/**/*.qml',
		core: './qmlcore/**/*.qml',
		corejs: '.qmlcore/**/*.js'
	}
};

var config = {
	server: {
		baseDir: "./build.web/"
	},
	tunnel: true,
	host: 'localhost',
	port: 4200,
	logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});


gulp.task('reload',function () {
	reload();
});
gulp.task('qml:build',function () {
	return run('./qmlcore/build').exec('',function () {
		reload();
	});
});

gulp.task('build', [
	'qml:build'
]);

gulp.task('watch', function(){
	watch([path.watch.qml, path.watch.core, path.watch.corejs], function(event, cb) {
		gulp.start('qml:build');
	});
});

gulp.task('default', ['webserver','watch']);
