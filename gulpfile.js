var gulp = require("gulp");
var webpack = require('webpack-stream');

gulp.task("default", function () {
  return gulp.src("src/main.js")
    .pipe(webpack({
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
    }))
    .pipe(gulp.dest("dist"));
});
