"use strict";

let gulp = require("gulp"),
    path = require("path"),
    jsonRestServe = require('json-rest-serve'),
    $ = require("gulp-load-plugins")({lazy: true}),
    bs = require("browser-sync").create(),
    del = require("del"),
    streamqueue = require("streamqueue"),
    mainBowerFiles = require("main-bower-files"),
    config = require("./gulp.config.js")();

del.sync(config.dist);

gulp.task("help", $.taskListing);
gulp.task("default", ["help"], function () {
    console.log("TODO: Doc here");
});

gulp.task("lint", () => {
    return gulp.src(config.files.js)
        .pipe($.eslint())
        .pipe($.eslint.format());
});

gulp.task("less", () => {
    return gulp
        .src(config.files.mainLess)
        .pipe($.less())
        .pipe(gulp.dest(config.dist));
});

/**
 * Serve - sub tasks - START
 */

gulp.task("serve_init", ["lint", "less"], () => {
    //Main task - Serve step: 1
    gulp.watch(config.files.js, ["lint"]);
    gulp.watch(config.files.less, ["less"]);
});

gulp.task("serve_injects", ["serve_init"], () => {
    //Main task - Serve step: 2
    return gulp
        .src(config.files.clientIndexHtml)
        .pipe($.inject(gulp.src(mainBowerFiles(), {read: false}), {name: "bower"}))
        .pipe($.inject(gulp.src(config.files.js).pipe($.angularFilesort()), {
            name: "app",
            transform: function (filename) {
                arguments[0] = arguments[0].replace(config.client, "");
                return $.inject.transform.apply($.inject.transform, arguments);
            }
        }))
        .pipe($.inject(gulp.src(config.dist + "*.css"), {
            name: "app",
            transform: function (filename) {
                arguments[0] = arguments[0].replace(config.dist, "");
                return $.inject.transform.apply($.inject.transform, arguments);
            }
        }))
        .pipe(gulp.dest(config.dist));
});

/**
 * Serve - sub tasks - END
 */

/**
 * Build - sub tasks - START
 */

gulp.task("build_js", [], () => {
    let jsBowerStream = gulp.src([].concat(mainBowerFiles(), "!**/*.css")),
        jsAppStream = gulp
                        .src(config.files.js)
                        .pipe($.angularFilesort())
                        .pipe($.eslint({
                            rules: {
                                "no-console": 2,
                            }
                        }))
                        .pipe($.eslint.failOnError())
                        .pipe($.eslint.format()),

        jsTemplateStream = gulp.src(config.files.template).pipe($.angularTemplatecache({
            module: "app",
            root: "app"
        }));

    return streamqueue({objectMode: true}, jsBowerStream, jsAppStream, jsTemplateStream)
        .pipe($.concat("all.min.js"))
        .pipe(gulp.dest(config.dist + "js"));

});

gulp.task("build_css", () => {
    var cssBowerStream = gulp.src([].concat(mainBowerFiles(), "!**/*.js"));
    var cssAppStream = gulp.src(config.files.mainLess).pipe($.less());

    return streamqueue({objectMode: true}, cssBowerStream, cssAppStream)
        .pipe($.concat("all.min.css"))
        .pipe(gulp.dest(config.dist + "css"));
});

gulp.task("build_fonts", () => {
    return gulp
        .src("bower_components/bootstrap/dist/fonts/*.*")
        .pipe(gulp.dest(config.dist + "fonts"));
});

/**
 * Build - sub tasks - END
 */


/**
 * Serve - Main task - START
 */

gulp.task("serve", ["serve_injects"], () => {
    //Main task - Serve step: 3
    bs.init(config.bs);

    gulp.watch([config.files.js, config.files.template, config.dist + "*.css"], (e) => {
        console.log("[" + e.type.toUpperCase() + "] " + e.path.replace(__dirname, "").replace(/^[\\\/]+/, ""));

        if (/\.css$/.test(e.path)) {
            bs.reload(config.dist + "*.css");
        } else {
            bs.reload();
        }
    });



    jsonRestServe.resource.add({
        root: 'api',
        name: 'person',
        key: 'id',
        data: require('./src/server/data/personnel.json'),
        pageSize: 25
    });
	
	jsonRestServe.resource.add({
        root: 'api',
        name: 'countries',
		key: 'code',
        data: require('./src/server/data/countries.json'),
        pageSize: 250
    });

    jsonRestServe.serve(3000);
});

/**
 * Build - Main task - START
 */

gulp.task("build", ["build_js", "build_css", "build_fonts"], () => {
    return gulp
        .src(config.files.clientIndexHtml)
        .pipe($.inject(gulp.src(config.dist + "**/*"), {
            name: "app",
            transform (filename) {
                arguments[0] = arguments[0].replace(config.dist, "");
                return $.inject.transform.apply($.inject.transform, arguments);
            }
        }))
        .pipe(gulp.dest(config.dist));
});

/**
 * BuildServe - Main task - START
 */

gulp.task("buildserve", ["build"], () => {
    let bsConfig = Object.assign({}, config.bs);
    delete bsConfig.server.routes;
    bs.init(bsConfig);
});

/**
 * Test - Main task - START
 */

gulp.task("test", (done) => {
    let Server = require("karma").Server;
    new Server({
        configFile: path.join(__dirname, "karma.conf.js"),
        singleRun: true
    }, done).start();
});