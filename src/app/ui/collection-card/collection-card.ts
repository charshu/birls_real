import { Component, Input, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../../prismic';
import { Prismic } from 'prismic.io';
@Component({
  selector: 'collection-card',
  styleUrls: ['./collection-card.scss'],
  templateUrl: './collection-card.html'
})
export class CollectionCard implements OnInit {
  @Input() document: any;
  @Input() showDate: boolean;
  groupImages: any;
  image1:any;
  image2:any;
  image3:any;
  imageUrl: string[];
  imageHeight: number;
  imagePointer:number=0;
  
  date: any;
  brand: any;
  season: any;
  category: string;
  title: any = '';
  titleText: string = '';
  paragraph: any = '';
  desc: string = '';
  isHover: boolean = false;
  limit = 100;
  isMore = false;

  toggle() {
    this.isHover = !this.isHover;
    //console.log(this.isHover);
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  capitalizeFirstLetter(string) {
    if (string !== undefined && string !== null) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return 'error';
  }

  loaded: boolean = false;
  loadingImage: boolean = true;
  constructor(
    private prismicService: PrismicService,
    @Inject('LinkResolver') private linkResolver: { (doc: any): string }
  ) {
   
  }

  ngOnInit() {
    this.groupImages = this.document.getGroup('collection.gallery').toArray();
    // console.log(this.groupImages);
    this.image1 = this.groupImages[0].getImageView('image','thumb');
    this.image2 = this.groupImages[1].getImageView('image','thumb');
    this.image3 = this.groupImages[2].getImageView('image','thumb');
    //  console.log(this.image1);
    this.imageUrl = [
    this.image1 !== undefined ? this.image1.url : '',
    this.image2 !== undefined ? this.image2.url : '',
    this.image3 !== undefined ? this.image3.url : ''
    ];
    // console.log(this.imageUrl);
   
    this.date = this.document.getDate('collection.date');
    this.season = this.document.getLink('collection.season');
    this.brand = this.document.getLink('collection.brand');
    this.loaded = true;

  }

}
