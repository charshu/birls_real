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
var prismic_io_1 = require("prismic.io");
var CardBoardComponent = (function () {
    function CardBoardComponent(route, router, prismicService, linkResolver) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.prismicService = prismicService;
        this.linkResolver = linkResolver;
        this.current_size = 0;
        this.card_per_page = 3;
        this.loaded = false;
        //social share
        this.fbUrl = 'https://www.facebook.com/birlsmagazine';
        this.twUrl = 'https://www.facebook.com/birlsmagazine';
        this.sub = this.route.params.subscribe(function (params) {
            _this.loaded = false;
            document.body.scrollTop = 0;
            console.log(_this.loaded);
            _this.category = params['category'];
            prismicService.api().then(function (api) { return api.getByUID('category', _this.category); }).then(function (document) {
                var categoryID = document.id;
                _this.image = document.getImage('category.cover');
                _this.imageUrl = _this.image !== null ? _this.image.url : '';
                prismicService.api().then(function (api) { return api.query([prismic_io_1.Prismic.Predicates.at('document.type', 'article'),
                    prismic_io_1.Prismic.Predicates.at('my.article.link', categoryID)], { orderings: '[my.article.date desc]' }); }).then(function (response) {
                    _this.card_per_page = 3;
                    _this.documents = response.results;
                    _this.loaded = true;
                    // console.log(this.documents.length);
                    console.log(_this.loaded);
                });
            });
        });
    }
    CardBoardComponent.prototype.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    CardBoardComponent.prototype.more = function () {
        this.card_per_page += 3;
    };
    CardBoardComponent.prototype.ngAfterViewInit = function () {
    };
    CardBoardComponent.prototype.ngOnInit = function () {
        this.loaded = false;
    };
    return CardBoardComponent;
}());
CardBoardComponent = __decorate([
    core_1.Component({
        templateUrl: './card-board.html',
        styleUrls: ['./card-board.scss']
    }),
    __param(3, core_1.Inject('LinkResolver')),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        prismic_1.PrismicService, Object])
], CardBoardComponent);
exports.CardBoardComponent = CardBoardComponent;
//# sourceMappingURL=card-board.js.map