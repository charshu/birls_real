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
var prismic_1 = require("../../prismic");
var Card = (function () {
    function Card(prismic, linkResolver) {
        this.prismic = prismic;
        this.linkResolver = linkResolver;
        this.title = '';
        this.titleText = '';
        this.paragraph = '';
        this.desc = '';
        this.isHover = false;
        this.limit = 100;
        this.isMore = false;
        this.loaded = false;
    }
    Card.prototype.toggle = function () {
        this.isHover = !this.isHover;
        //console.log(this.isHover);
    };
    Card.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Card.prototype.capitalizeFirstLetter = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    Card.prototype.ngOnInit = function () {
        this.image = this.document.getImage('article.post-image');
        this.imageUrl = this.image !== null ? this.image.url : '';
        this.imageHeight = this.getRandomInt(300, 500);
        this.date = this.document.getDate('article.date');
        this.link = this.document.getLink('article.link');
        // console.log(this.link);
        this.category = this.link !== null ? this.link.slug : '';
        this.title = this.document.getStructuredText('article.title');
        this.titleText = this.title !== null ? this.title.getTitle().text : '';
        //desc
        this.paragraph = this.document.getFirstParagraph();
        this.desc = this.paragraph !== null ? this.paragraph.text : '';
        //trim
        if (this.desc.length >= this.limit) {
            this.desc = this.desc.substring(0, this.limit);
            this.desc = this.desc.substring(0, Math.min(this.desc.length, this.desc.lastIndexOf(' '))) + '...';
            this.isMore = true;
        }
        // console.log(this.document);
        // console.log(this.title.getTitle());
    };
    return Card;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Card.prototype, "document", void 0);
Card = __decorate([
    core_1.Component({
        selector: 'card',
        styleUrls: ['./card.scss'],
        templateUrl: './card.html'
    }),
    __param(1, core_1.Inject('LinkResolver')),
    __metadata("design:paramtypes", [prismic_1.PrismicService, Object])
], Card);
exports.Card = Card;
//# sourceMappingURL=card.js.map