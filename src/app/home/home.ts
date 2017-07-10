import {Component, Inject, OnInit,HostListener} from '@angular/core';
import {PrismicService} from '../prismic';
import {ActivatedRoute} from '@angular/router';
import {Prismic} from 'prismic.io';
import {Observable} from 'rxjs/Observable';
import {InstagramService} from './../shared/instagram-service'
import {IGImage} from './../shared/type.d'

@Component({selector: 'home', styleUrls: ['./home.scss'], templateUrl: './home.html'})
export class Home implements OnInit {
  slider_docs : Array < any >;
  fashion_docs : any;
  beauty_docs : any;
  life_styles_docs : any;
  makeUpDocs : any;
  skinCareDocs : any;
  beautyTipsDocs : any;
  hairAndNailDocs : any;
  talent_docs : any;
  collection_docs : any;
  images : any;
  card_per_page = 4;
  loaded : number = 0;
  IGimages : IGImage[];
  current_slide : number = 0;
  igImageLimit : number = undefined;
  video = {
    ss: './../../resources/img/vid/vid1.jpg',
    url: 'https://www.youtube.com/watch?v=kmDMqzhvNLk'
  }
  populars = [
    'Tacchi + calzini: come abbinarli in modo cool in inverno',
    '7 mostre di moda da non perdere assolutamente nel 2017!',
    'Tendenza Wrap dress: l’abito a vestaglia è il più cool del momento',
    'Come vestirsi per uscire la sera, dormire fuori ma evitare la walk of shame',
    'Sono le celebrity le nuove stiliste cool del momento?',
    'How to get the Calvin Klein x Raf Simons look',
    'Beauty Brand 2 Know: Wander Beauty'
  ];
  goUrl(url) {
    window.open(url, "_blank");
  }
  next() {
    this.current_slide++;
    this.current_slide %= this.images.length;
    console.log(this.current_slide);
  }
  prev() {
    this.current_slide--;
    this.current_slide %= this.images.length;
    console.log(this.current_slide);
  }
  constructor(private prismicService : PrismicService, private instagramService : InstagramService, @Inject('LinkResolver')private linkResolver : {
    (doc : any): string
  }) {}

@HostListener('window:resize', ['$event'])
onResize(event) {
  this.igImageLimit = this.calculateImageLimit(event.target.innerWidth,100,20);
}
calculateImageLimit(windowWidth,imageWidth,gutter){
  // row padding-left = 15, row padding-right = 15
  let n = (windowWidth - (2 * 15) + 20)  / (imageWidth+gutter);
  console.log(n);
  return n;
}
  ngOnInit() {
    // ig images
    this
      .instagramService
      .getPictures()
      .subscribe((IGimages) => {
        this.IGimages = IGimages;
        this.igImageLimit = this.calculateImageLimit(window.innerWidth,100,20);
        // console.log(this.IGimages);
      });
      
    
    //slider
    this
      .prismicService
      .api()
      .then((api) => api.query([
        Prismic
          .Predicates
          .at('document.type', 'slider')
      ]))
      .then((response) => {
        this.slider_docs = response.results;
        this.images = this
          .slider_docs[0]
          .getGroup('slider.images')
          .toArray();
        this.loaded++;
      });

    //fashion
    this
      .prismicService
      .api()
      .then((api) => api.query([
        Prismic
          .Predicates
          .at('document.type', 'article'),
        Prismic
          .Predicates
          .any('my.article.link', ['WHIp5ikAALg6MBFc', 'WKMVdiUAAFBBgJLB', 'WHI-uykAAJJWMG0F', 'WKMa4SUAADBCgKrr'])
      ], {
        orderings: '[my.article.date desc]',
        'fetchLinks': 'category.name',
        pageSize: 4
      }))
      .then((response) => {
        this.fashion_docs = response.results;
        // console.log(this.fashion_docs);
        this.loaded++;
      });

    //beauty and sub categories
    this
      .prismicService
      .api()
      .then((api) => {
        api.query([
          Prismic
            .Predicates
            .at('document.type', 'article'),
          Prismic
            .Predicates
            .any('my.article.link', ['WKqliyYAAKRkYjfX', 'WKqmfSYAAHdmYjwG', 'WV0QLyUAAJ4H3eyj', 'WV0QEyUAAFYG3ewg'])
        ], {
          orderings: '[my.article.date desc]',
          'fetchLinks': 'category.name',
          pageSize: 5
        }).then((response) => {
          this.beauty_docs = response.results;
          // console.log(this.beauty_docs);

        })
        // make-up
        api.query([
          Prismic
            .Predicates
            .at('document.type', 'article'),
          Prismic
            .Predicates
            .any('my.article.link', ['WKqliyYAAKRkYjfX'])
        ], {
          orderings: '[my.article.date desc]',
          'fetchLinks': 'category.name',
          pageSize: 5
        }).then((response) => {
          this.makeUpDocs = response.results;
          // console.log(this.beauty_docs);
        })
        // skincare
        api.query([
          Prismic
            .Predicates
            .at('document.type', 'article'),
          Prismic
            .Predicates
            .any('my.article.link', ['WKqmfSYAAHdmYjwG'])
        ], {
          orderings: '[my.article.date desc]',
          'fetchLinks': 'category.name',
          pageSize: 5
        }).then((response) => {
          this.skinCareDocs = response.results;
          // console.log(this.beauty_docs);

        })
        // beauty-tips
        api.query([
          Prismic
            .Predicates
            .at('document.type', 'article'),
          Prismic
            .Predicates
            .any('my.article.link', ['WV0QLyUAAJ4H3eyj'])
        ], {
          orderings: '[my.article.date desc]',
          'fetchLinks': 'category.name',
          pageSize: 5
        }).then((response) => {
          this.beautyTipsDocs = response.results;
          // console.log(this.beauty_docs);

        })
        // hair-and-nail
        api.query([
          Prismic
            .Predicates
            .at('document.type', 'article'),
          Prismic
            .Predicates
            .any('my.article.link', ['WV0QEyUAAFYG3ewg'])
        ], {
          orderings: '[my.article.date desc]',
          'fetchLinks': 'category.name',
          pageSize: 5
        }).then((response) => {
          this.hairAndNailDocs = response.results;
          // console.log(this.beauty_docs);

        })
        this.loaded++;
      });

    //talent
    this
      .prismicService
      .api()
      .then((api) => api.query([
        Prismic
          .Predicates
          .at('document.type', 'article'),
        Prismic
          .Predicates
          .any('my.article.link', ['WWHwCScAAHxTSe92', 'WWNkoScAAH-YUFZ6'])
      ], {
        orderings: '[my.article.date desc]',
        'fetchLinks': 'category.name',
        pageSize: 4
      }))
      .then((response) => {
        this.talent_docs = response.results;
        console.log(this.talent_docs);
        this.loaded++;
      });
      //life styles
    this
      .prismicService
      .api()
      .then((api) => api.query([
        Prismic
          .Predicates
          .at('document.type', 'article'),
        Prismic
          .Predicates
          .any('my.article.link', ['WV0FKiUAAFUG3buM', 'WV0FXyUAAFYG3bx_','WV0FfiUAAJ4H3b0P','WV0I1SUAAFIG3cvo'])
      ], {
        orderings: '[my.article.date desc]',
        'fetchLinks': 'category.name',
        pageSize: 4
      }))
      .then((response) => {
        this.life_styles_docs = response.results;
        this.loaded++;
      });
    //collection
    this
      .prismicService
      .api()
      .then((api) => api.query([
        Prismic
          .Predicates
          .at('document.type', 'collection'),
        Prismic
          .Predicates
          .at('my.collection.enable-review', 'yes')
      ], {
        orderings: '[my.collection.date desc]',
        'fetchLinks': [
          'brand.name', 'season.name'
        ],
        pageSize: 4
      }))
      .then((response) => {
        this.collection_docs = response.results;
        // console.log(this.collection_docs);
        this.loaded++;
      });

  }

}