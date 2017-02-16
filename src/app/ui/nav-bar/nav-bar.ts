import {Component, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PrismicService} from '../../prismic';
import {Prismic} from 'prismic.io';

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.html',
    styleUrls: ['./nav-bar.scss']
})

export class NavBar {
    private sub : any;
    focus : boolean;
    active : boolean;
    tabs = [
        {
            label: 'Fashion',
            link: 'fashion/all',
            links: [
                {
                    label: 'Shopping',
                    url: 'fashion/shopping'
                }, {
                    label: 'Trends',
                    url: 'fashion/trends'
                }, {
                    label: 'Style du Jours',
                    url: 'fashion/style-du-jours'
                }, {
                    label: 'Editorial',
                    url: 'fashion/editorial'
                }, {
                    label: 'Fashion mood board',
                    url: 'fashion/mood-board'
                }
            ],
            groups: [
                {
                    title: 'Mood board',
                    style: 1,
                    items: [
                        {
                            img: './../../../resources/img/menu/all.jpg',
                            desc: 'All Fashion',
                            url: 'fashion/all',
                            active: false
                        }
                    ]
                }, {
                    title: 'By Category',
                    style: 2,
                    items: [
                        {
                            img: './../../../resources/img/menu/shopping.jpg',
                            desc: 'Shopping',
                            url: 'fashion/shopping',
                            active: false
                        }, {
                            img: './../../../resources/img/menu/trends.jpg',
                            desc: 'Trends',
                            url: 'fashion/trends',
                            active: false
                        }, {
                            img: './../../../resources/img/menu/style.jpg',
                            desc: 'Style du Jours',
                            url: 'fashion/style-du-jours',
                            active: false
                        }, {
                            img: './../../../resources/img/menu/editorial.jpg',
                            desc: 'Editorial',
                            url: 'fashion/editorial',
                            active: false
                        }
                    ]
                }
            ],
            active: false
        }, {
            label: 'Beauty',
            link: '',
            links: [],
            groups: [
                {
                    title: 'Category',
                    style: 3,
                    items: [
                        {
                            img: './../../../resources/img/menu/shopping.jpg',
                            desc: 'Shopping',
                            url: 'fashion/shopping',
                            active: false
                        }
                    ]
                }
            ],

            active: false
        }, {
            label: 'Birls',
            link: '',
            links: [],
            groups: [],
            active: false
        }, {
            label: 'Runway',
            link: 'runway',
            links: [],
            groups: [],
            active: false
        }, {
            label: 'TV',
            link: '',
            links: [],
            groups: [],
            active: false
        }, {
            label: '<i class="fa fa-shopping-bag" aria-hidden="true"></i> Shop',
            link: '',
            links: [],
            groups: [],
            active: false
        }
    ];
    lastIndex : number = -1;
    backdrop : boolean = false;
    setActive(i : number) {
        //console.log('mouseenter last' + this.lastIndex);
        if (this.lastIndex === i) {
            return;
        }
        if (this.lastIndex !== -1) {
            this.tabs[this.lastIndex].active = false;
        } else {
            //when mouse enter close all opening tabs before pop new tab
            for (let i : number = 0; i < (this.tabs).length; i++) {
                this.tabs[i].active = false;
            }
        }
        this.lastIndex = i;
        this.tabs[i].active = true;
        //turn on backdrop only dropdown menu has links
        if (this.tabs[i].links.length > 1) {
            this.backdrop = true;
        } else {
            this.backdrop = false;
        }

        // console.log('mouseenter current' + this.lastIndex);
    }

    isActive(i : number) {
        return this.tabs[i].active;
    }
    closeAll() {
        //  console.log('mouseleave current' + this.lastIndex);
        this.lastIndex = -1;

        setTimeout(() => {
            if (this.lastIndex === -1) {
                for (let i : number = 0; i < (this.tabs).length; i++) {
                    this.tabs[i].active = false;
                }
                this.backdrop = false;
            }

        }, 200);

    }

    constructor(private route : ActivatedRoute, private router : Router, private prismicService : PrismicService, @Inject('LinkResolver')private linkResolver : {
        (doc : any): string
    }) {

        this.sub = this
            .route
            .params
            .subscribe(params => {
                //    this.loaded = false;     prismicService.api().then((api) =>
                // api.query([Prismic.Predicates.at('document.category', 'article'),
                // Prismic.Predicates.at('my.article.link', categoryID)], { orderings:
                // '[my.article.date desc]','fetchLinks': 'category.name' })).then((response) =>
                // {         this.documents = response.results;         this.queryTitle =
                // this.category;         this.loaded = true;       });

            })
    }

}