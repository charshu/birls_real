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
var angular2_moment_1 = require("angular2-moment");
var ng2_social_share_1 = require("ng2-social-share");
var ng2_parallax_scroll_1 = require("ng2-parallax-scroll");
var prismic_1 = require("./prismic");
var home_1 = require("./home/home");
var document_1 = require("./document/document");
var card_board_1 = require("./card-board/card-board");
var nav_bar_1 = require("./ui/nav-bar");
var card_1 = require("./ui/card/card");
var app_pipe_1 = require("./app.pipe");
// Use the endpoint of your repository
var ENDPOINT = 'https://charshu.prismic.io/api';
// Specify an access token if your API is set to private
var ACCESS_TOKEN = null;
// Customize this to match your routing pattern
function linkResolver(doc) {
    if (doc.type === 'article') {
        var category = doc.getLink('article.link').uid;
        //menu fashion
        if (category === 'shopping' || category === 'trends') {
            return "/fashion/" + category + "/" + encodeURIComponent(doc.uid);
        }
    }
    else if (doc.type === 'category') {
        var category = doc.uid;
        if (category === 'shopping' || category === 'trends') {
            return "/fashion/" + category;
        }
    }
    return "/" + doc.type + "/" + encodeURIComponent(doc.uid);
}
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_1.AppComponent, document_1.Document, home_1.Home, nav_bar_1.NavBar, card_board_1.CardBoardComponent, card_1.Card, app_pipe_1.TruncatePipe, ng2_social_share_1.CeiboShare],
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(app_routes_1.rootRouterConfig), angular2_moment_1.MomentModule, ng2_parallax_scroll_1.Ng2ParallaxScrollModule],
        providers: [
            prismic_1.PrismicService,
            // {provide: LocationStrategy, useClass: HashLocationStrategy},
            { provide: 'PrismicEndpoint', useValue: ENDPOINT },
            { provide: 'PrismicAccessToken', useValue: ACCESS_TOKEN },
            { provide: 'LinkResolver', useValue: linkResolver }
        ],
        bootstrap: [app_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map