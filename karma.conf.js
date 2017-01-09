"use strict";

let files = require("main-bower-files")({
    includeDev: true
});

files.push("src/client/app/**/*.module.js");
files.push("src/client/app/**/*.controller.js");
files.push("src/client/app/**/*.spec.js");

module.exports = function (config) {
    config.set({
        frameworks: ["jasmine"],
        files: files,
        browsers: ["PhantomJS"],
        reporters: ["spec"]
    });
};