import {
  Component,
  Input,
  Inject,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  PrismicService
} from '../../prismic';
import {
  Prismic
} from 'prismic.io';


@Component({
  selector: 'collection-card',
  styleUrls: ['./collection-card.scss'],
  templateUrl: './collection-card.html'
})
export class CollectionCard implements OnInit {
  @Input() document: any;
  @Input() showDate: boolean;
  @Input() cardSize: number = 1;
  @Input() textSize: number;
  @Input() styleNumber: number;
  @Input() limit = 100;
  @Input() cardHeight: number;
  @Input() cardWidth: number;
  text: {
    brand: number,
    season: number
  } = {
    brand: 1,
    season: 1
  };
  groupImages: any;
  image1: any;
  image2: any;
  image3: any;
  imageUrl: string[];
  imageHeight: number;
  imagePointer: number = 0;

  date: any;
  brand: any;
  season: any;
  enable_review: any;
  category: string;
  title: any = '';
  titleText: string = '';
  paragraph: any = '';
  desc: string = '';
  isHover: boolean = false;

  isMore = false;
  loaded: boolean = false;
  loadingImage: boolean = true;
  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  offset = 100;

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

  constructor(private prismicService: PrismicService, @Inject('LinkResolver') private linkResolver: {
    (doc: any): string
  }) {}

  ngOnInit() {
    
    this.enable_review = this.document.data['collection.enable-review'] !== undefined ? this.document.getBoolean('collection.enable-review') : false;
    if (this.enable_review) {
      this.title = this.document.getStructuredText('collection.title');
      this.paragraph = this.document.getFirstParagraph();
      this.desc = this.paragraph !== null ? this.paragraph.text : '';
      if (this.desc.length >= this.limit) {
        this.desc = this.desc.substring(0, this.limit);
        this.desc = this.desc.substring(0, Math.min(this.desc.length, this.desc.lastIndexOf(' '))) + '...';
        this.isMore = true;
      }
    }

    if(!this.cardHeight)this.cardHeight = 6.0 * 50 * this.cardSize;
    if(!this.cardWidth)this.cardWidth = 3.0 * 50 * this.cardSize;
    this.text.brand = 1.4 * this.textSize;
    this.text.season = 0.8 * this.textSize;
    this.groupImages = this.document.getGroup('collection.gallery') ? this.document.getGroup('collection.gallery').toArray() : [];
    this.image1 = this.groupImages[0].getImageView('image', 'thumb');
    // this.image2 = this.groupImages[1].getImageView('image','thumb'); this.image3
    // = this.groupImages[2].getImageView('image','thumb');
    this.imageUrl = [
      this.image1 !== undefined ? this.image1.url : ''
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