"use strict";

module.exports = function () {
    let client = "src/client/",
        clientApp = client + "app/",
        dist = "dist/",
        port = 9000;

    let url = require('url'),
        proxy = require('proxy-middleware'),
        proxyOptions = url.parse('http://localhost:3000/api');

    proxyOptions.route = '/api';

    return {
        client: client,
        dist: dist,
        files: {
            clientIndexHtml: client + "index.html",
            mainLess: clientApp + "app.style.less",
            js: [clientApp + "**/*.js", "!" + clientApp + "**/*.spec.js"],
            template: [clientApp + "**/*.html"],
            less: clientApp + "**/*.less"
        },
        bs: {
            server: {
                baseDir: dist,
                middleware: [proxy(proxyOptions)],
                routes: {
                    "/bower_components": "bower_components",
                    "/app": clientApp
                }
            },
            port: port,
            open: false,
            notify: false,
            ghostMode: false,
            logPrefix: "BrowserSync"
        }
    };
};