import {Component, Input, Inject, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PrismicService} from '../../prismic';
import {Prismic} from 'prismic.io';
@Component({selector: 'collection-card', styleUrls: ['./collection-card.scss'], templateUrl: './collection-card.html'})
export class CollectionCard implements OnInit {
  @Input()document : any;
  @Input()showDate : boolean;
  @Input()cardSize : number;
  @Input()textSize : number;
  card_h : number;
  card_w : number;
  text : {
    brand: number,
    season: number
  } = { brand:1,season:1};
  groupImages : any;
  image1 : any;
  image2 : any;
  image3 : any;
  imageUrl : string[];
  imageHeight : number;
  imagePointer : number = 0;

  date : any;
  brand : any;
  season : any;
  category : string;
  title : any = '';
  titleText : string = '';
  paragraph : any = '';
  desc : string = '';
  isHover : boolean = false;
  limit = 100;
  isMore = false;
  loaded : boolean = false;
  loadingImage : boolean = true;

  toggle() {
    this.isHover = !this.isHover;
    //console.log(this.isHover);
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  capitalizeFirstLetter(string) {
    if (string !== undefined && string !== null) {
      return string
        .charAt(0)
        .toUpperCase() + string.slice(1);
    }
    return '';
  }

  constructor(private prismicService : PrismicService, @Inject('LinkResolver')private linkResolver : {
    (doc : any): string
  }) {}

  ngOnInit() {
    this.card_h = 4.5 * 60 * this.cardSize;
    this.card_w = 3.0 * 60 * this.cardSize;
    this.text.brand = 1.6 * this.textSize;
    this.text.season = 0.8 * this.textSize;
    this.groupImages = this
      .document
      .getGroup('collection.gallery')
      .toArray();
    this.image1 = this
      .groupImages[0]
      .getImageView('image', 'thumb');
    // this.image2 = this.groupImages[1].getImageView('image','thumb'); this.image3
    // = this.groupImages[2].getImageView('image','thumb');
    this.imageUrl = [
      this.image1 !== undefined
        ? this.image1.url
        : ''
        // this.image2 !== undefined ? this.image2.url : '', this.image3 !== undefined ?
        // this.image3.url : ''
    ];
    this.date = this.document.getDate('collection.date');
    this.season = this.document.getLink('collection.season');
    this.brand = this.document.getLink('collection.brand');
    console.log(this.brand);
    this.loaded = true;

  }

}
