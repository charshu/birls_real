"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var prismic_1 = require("../prismic");
var Home = (function () {
    function Home(prismicService, linkResolver) {
        var _this = this;
        this.prismicService = prismicService;
        this.linkResolver = linkResolver;
        prismicService.api().then(function (api) { return api.query(''); }).then(function (response) {
            _this.documents = response.results;
        });
    }
    Home.prototype.ngOnInit = function () {
        console.log("Init home!");
    };
    return Home;
}());
Home = __decorate([
    core_1.Component({
        selector: 'home',
        styleUrls: ['./home.css'],
        templateUrl: './home.html'
    }),
    __param(1, core_1.Inject('LinkResolver')),
    __metadata("design:paramtypes", [prismic_1.PrismicService, Object])
], Home);
exports.Home = Home;
//# sourceMappingURL=home.js.map