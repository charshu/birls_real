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

  groupImages:any;
  image:any;
  imageUrl:string;
  imageHeight:number;

  date:any;
  brand:any;
  season:any;
  category:string;
  title:any = '';
  titleText:string='';
  paragraph:any = '';
  desc:string = '';
  isHover:boolean = false;
  limit = 100;
  isMore = false;
  
  toggle(){
    this.isHover = !this.isHover;
    //console.log(this.isHover);
  }
  getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private loaded: boolean = false;

  constructor(
    private prismicService: PrismicService,
    @Inject('LinkResolver') private linkResolver: {(doc: any): string}
  ) 
  {
    prismicService.api().then((api) => api.getByUID('season', this.document.getLink('collection.season').uid)).then((res) => {
          this.season = res;
          // console.log(res);
          this.loaded = true;
        });


  }

  ngOnInit() {
    this.groupImages = this.document.getGroup('collection.gallery').toArray();
    this.image = this.groupImages[this.getRandomInt(0,this.groupImages.length-1)].getFirstImage();
    this.imageUrl = this.image !== null?this.image.url:'';

    
    this.date = this.document.getDate('collection.date');

    // this.season = this.document.getLink('collection.season');
    this.brand = this.document.getLink('collection.brand');
    // console.log(this.season);
    // this.season = this.season !==null?this.season.slug:'';
    this.brand = this.brand !==null?this.brand.slug:'';
    
    //desc
    // this.paragraph = this.document.getFirstParagraph();
    // this.desc = this.paragraph !==null?this.paragraph.text:'';
    //trim
    // if(this.desc.length >= this.limit){
    //   this.desc = this.desc.substring(0,this.limit);
    //   this.desc = this.desc.substring(0,Math.min(this.desc.length,this.desc.lastIndexOf(' ')))+'...';
    //   this.isMore = true;
    // }
 
   // console.log(this.document);
   // console.log(this.title.getTitle());
  }

}
