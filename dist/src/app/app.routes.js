"use strict";
var home_1 = require("./home/home");
var document_1 = require("./document/document");
exports.rootRouterConfig = [
    { path: '', component: home_1.Home },
    { path: ':type/:id', component: document_1.Document }
];
//# sourceMappingURL=app.routes.js.map