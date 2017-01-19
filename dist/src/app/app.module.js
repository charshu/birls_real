"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var app_1 = require("./app");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var prismic_1 = require("./prismic");
var home_1 = require("./home/home");
var document_1 = require("./document/document");
// Use the endpoint of your repository
var ENDPOINT = 'https://charshu.prismic.io/api';
// Specify an access token if your API is set to private
var ACCESS_TOKEN = null;
// Customize this to match your routing pattern
function linkResolver(doc) {
    return "/" + doc.type + "/" + doc.id;
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_1.AppComponent, document_1.Document, home_1.Home],
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(app_routes_1.rootRouterConfig)],
        providers: [
            prismic_1.PrismicService,
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            { provide: 'PrismicEndpoint', useValue: ENDPOINT },
            { provide: 'PrismicAccessToken', useValue: ACCESS_TOKEN },
            { provide: 'LinkResolver', useValue: linkResolver }
        ],
        bootstrap: [app_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map