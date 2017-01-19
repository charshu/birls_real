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
var prismic_io_1 = require("prismic.io");
var PREVIEW_EXPIRES = 30 * 60 * 1000; // 30 minutes
var PrismicService = (function () {
    function PrismicService(endpoint, accessToken, linkResolver) {
        this.endpoint = endpoint;
        this.accessToken = accessToken;
        this.linkResolver = linkResolver;
    }
    PrismicService.prototype.api = function () {
        return prismic_io_1.Prismic.api(this.endpoint, {
            accessToken: this.accessToken
        });
    };
    PrismicService.prototype.setRef = function (token) {
        document.cookie = prismic_io_1.Prismic.previewCookie + "=" + token + "; expires=" + PREVIEW_EXPIRES;
    };
    PrismicService.prototype.preview = function (token) {
        var _this = this;
        return this.api().then(function (api) {
            return api.previewSession(token, _this.linkResolver, '/').then(function (url) {
                _this.setRef(token);
                return url;
            });
        });
    };
    return PrismicService;
}());
PrismicService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject('PrismicEndpoint')),
    __param(1, core_1.Inject('PrismicAccessToken')),
    __param(2, core_1.Inject('LinkResolver')),
    __metadata("design:paramtypes", [String, String, Object])
], PrismicService);
exports.PrismicService = PrismicService;
//# sourceMappingURL=prismic-service.js.map