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
var router_1 = require("@angular/router");
var prismic_1 = require("../prismic");
var Document = (function () {
    function Document(route, router, prismic, linkResolver) {
        this.route = route;
        this.router = router;
        this.prismic = prismic;
        this.linkResolver = linkResolver;
        this.loaded = false;
    }
    Document.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            var id = params['id'];
            _this.prismic.api().then(function (api) { return api.getByID(id); }).then(function (document) {
                _this.document = document;
                _this.loaded = true;
            });
        });
    };
    return Document;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], Document.prototype, "id", void 0);
Document = __decorate([
    core_1.Component({
        selector: 'document',
        styleUrls: ['./document.css'],
        templateUrl: './document.html'
    }),
    __param(3, core_1.Inject('LinkResolver')),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        prismic_1.PrismicService, Object])
], Document);
exports.Document = Document;
//# sourceMappingURL=document.js.map