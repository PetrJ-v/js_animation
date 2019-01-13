
const { watch, src, dest, series, parallel } = require('gulp');
const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const del          = require('del'); // Подключаем библиотеку для удаления файлов и папок
const minifyCSS    = require('gulp-csso'); // Подключаем пакет для минификации CSS
// const cssnano      = require('gulp-cssnano'); 
const rename       = require('gulp-rename'); // Подключаем библиотеку для переименования файлов
const imagemin     = require('gulp-imagemin'); // Подключаем библиотеку для работы с изображениями
const pngquant     = require('imagemin-pngquant'); // Подключаем библиотеку для работы с png
const cache        = require('gulp-cache'); // Подключаем библиотеку кеширования
const uglify       = require('gulp-uglifyjs');
const browserSync  = require('browser-sync');
const rev          = require('gulp-rev-append');
const cssnano      = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');


function letSass() {
  return src('app/sass/main.sass')
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 5 versions'],
		cascade: true
	}))
	.pipe(dest('app/css'))
	.pipe(minifyCSS()) // Сжимаем
	.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
	.pipe(dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
}
exports.sass = letSass;

cssLibs = function() {
	return src('app/sass/libs.sass') // Выбираем файл для минификации
	.pipe(sass())
	.pipe(minifyCSS()) // Сжимаем
	.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
	.pipe(dest('app/css')); // Выгружаем в папку app/css
}
exports.cssLibs = cssLibs;

function scripts(){
	return src(
		[
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/modernizr-custom/modernizr-custom.min.js'
		], 
		{ sourcemaps: true } 
	)
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(dest('app/js', { sourcemaps: true }));
}
exports.scripts = scripts;

function clean() {
	// return del.sync('dist'); // Удаляем папку dist перед сборкой
	return del('dist/**', {force:true});
}

function clear (callback) {
	return cache.clearAll();// Этот комент пишу я. Скорее всего эту задачц нужно запускать отдельно для очистки кэша изибражений
}

syncBrowser = function(){
	browserSync.init({
		server: "./app"
	});
}

function watchFiles() {
	syncBrowser();
	watch( 'app/sass/**/*.sass' ).on('change', series(letSass, browserSync.reload) );
	watch([
		'app/js/**/*.js',
		'app/**/*.html'
	]).on('change', browserSync.reload);
};

//Build functions
function buildCSS() {
	return src('app/css/**/*.min.css')
		.pipe(dest('dist/css')) // Выгружаем в папку app/css
}
exports.buildCSS = buildCSS;

function buildFonts(){
	return src('app/fonts/**/*') // Переносим шрифты в продакшен
		.pipe(dest('dist/fonts'))	
}


function buildJs() {
	return src('app/js/**/*')
		.pipe(dest('dist/js'))
}
exports.buildJs = buildJs;

function buildImg() {
	return src('app/img/**/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 5,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(dest('dist/img'));
}

function buildPhp() {
	return src('app/*.php')
		.pipe(dest('dist'))
}

function buildHtml() {
	return src('app/index.html')
		.pipe(rev()) // Добавляем хэши к подключаемым файлам чтобы избежать кэширования браузером при обновлении версии файлов
		.pipe(dest('dist'))
}
// var buildImg = gulp.src('app/img/**/**/*') // Переносим HTML в продакшен
	// .pipe(gulp.dest('dist/img'));

const build = series(clean, parallel(letSass, cssLibs, buildFonts, buildJs, buildImg, buildPhp, buildHtml), buildCSS);
exports.build = build;

exports.clean = clean;

exports.default = watchFiles;