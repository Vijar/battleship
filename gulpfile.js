var gulp = require("gulp");
var webpack = require('webpack-stream');
var webpackConfig = {
    watch: true,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    output: {
        filename: "[name].js"
    },
    devtool: 'inline-source-map'
};

gulp.task("default", function () {
    delete webpackConfig.watch;
    return gulp.src("src/main.js")
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest("dist"));
});

gulp.task("build", function () {
    return gulp.src("src/main.js")
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest("dist"));
});
