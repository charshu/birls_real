"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var NavBar = (function () {
    function NavBar() {
        this.tabs = [{
                label: 'Fashion',
                links: [{
                        label: 'Shopping',
                        url: 'fashion/shopping'
                    },
                    {
                        label: 'Trends',
                        url: 'fashion/trends'
                    },
                    {
                        label: 'Style du Jours',
                        url: 'fashion/style-du-jours'
                    },
                    {
                        label: 'Editorial',
                        url: 'fashion/editorial'
                    },
                    {
                        label: 'Fashion mood board',
                        url: 'fashion/mood-board'
                    }],
                items: [{
                        img: './../../resources/img/lights.jpg',
                        desc: 'The titles of Washed Out\'s breakthrough song and the first single from Paracosm share the two most '
                    }, {
                        img: './../../resources/img/grass.jpg',
                        desc: 'The titles of Washed Out\'s breakthrough song and the first single from Paracosm '
                            + 'share the two most important words in Ernest Greene\'s '
                            + 'musical language: feel it. It\'s a simple request, as well...'
                    }],
                active: false
            }, {
                label: 'Weird and Quirky',
                links: [],
                active: false
            }, {
                label: 'Beauty',
                links: [],
                active: false
            }, {
                label: 'Runway',
                links: [],
                active: false
            }, {
                label: '<i class="fa fa-shopping-bag" aria-hidden="true"></i> Shop',
                links: [],
                active: false
            }];
        this.lastIndex = -1;
        this.backdrop = false;
    }
    NavBar.prototype.setActive = function (i) {
        //console.log('mouseenter last' + this.lastIndex);
        if (this.lastIndex === i) {
            return;
        }
        if (this.lastIndex !== -1) {
            this.tabs[this.lastIndex].active = false;
        }
        else {
            //when mouse enter close all opening tabs before pop new tab
            for (var i_1 = 0; i_1 < (this.tabs).length; i_1++) {
                this.tabs[i_1].active = false;
            }
        }
        this.lastIndex = i;
        this.tabs[i].active = true;
        //turn on backdrop only dropdown menu has links
        if (this.tabs[i].links.length > 0) {
            this.backdrop = true;
        }
        else {
            this.backdrop = false;
        }
        // console.log('mouseenter current' + this.lastIndex);
    };
    NavBar.prototype.isActive = function (i) {
        return this.tabs[i].active;
    };
    NavBar.prototype.closeAll = function () {
        var _this = this;
        //  console.log('mouseleave current' + this.lastIndex);
        this.lastIndex = -1;
        setTimeout(function () {
            if (_this.lastIndex === -1) {
                for (var i = 0; i < (_this.tabs).length; i++) {
                    _this.tabs[i].active = false;
                }
                _this.backdrop = false;
            }
        }, 200);
    };
    return NavBar;
}());
NavBar = __decorate([
    core_1.Component({
        selector: 'nav-bar',
        templateUrl: './nav-bar.html',
        styleUrls: ['./nav-bar.scss']
    })
], NavBar);
exports.NavBar = NavBar;
//# sourceMappingURL=nav-bar.js.map