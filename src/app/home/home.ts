import {Component, Inject, OnInit} from '@angular/core';
import {PrismicService} from '../prismic';
import {ActivatedRoute} from '@angular/router';
import { Prismic } from 'prismic.io';
@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})
export class Home implements OnInit {
  slider_docs: Array<any>;
  fashion_docs:any;
  beauty_docs:any;
  collection_docs:any;
  images:any;
  card_per_page = 4;
  loaded: number = 0;
  constructor(
    private prismicService: PrismicService,
    @Inject('LinkResolver') private linkResolver: {(doc: any): string}
  ) {
    
  }

  ngOnInit() {
    this.prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'slider')])).then((response) => {
      this.slider_docs = response.results;
      console.log(this.slider_docs);
      this.images = this.slider_docs[0].getGroup('slider.images').toArray();
    });

    //fashion
    this.prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'article'),Prismic.Predicates.any('my.article.link', ['WHIp5ikAALg6MBFc','WKMVdiUAAFBBgJLB','WHI-uykAAJJWMG0F','WKMa4SUAADBCgKrr'])], { orderings: '[my.article.date desc]','fetchLinks': 'category.name',pageSize : this.card_per_page })).then((response) => {
            this.fashion_docs = response.results;
            // console.log(this.fashion_docs);
            this.loaded++;
          });

    //beauty
    this.prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'article'),Prismic.Predicates.any('my.article.link', ['WKqliyYAAKRkYjfX','WKqmfSYAAHdmYjwG'])], { orderings: '[my.article.date desc]','fetchLinks': 'category.name',pageSize : this.card_per_page })).then((response) => {
            this.beauty_docs = response.results;
            // console.log(this.beauty_docs);
            this.loaded++;
          });

    //collection
    this.prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'collection'),Prismic.Predicates.at('my.collection.enable-review', 'yes')], { orderings: '[my.collection.date desc]','fetchLinks': ['brand.name','season.name'],pageSize : 3 })).then((response) => {
            this.collection_docs = response.results;
            console.log(this.collection_docs);
            this.loaded++;
          });
   
  }

}
