import { Component, Input, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../../prismic';

@Component({
  selector: 'card',
  styleUrls: ['./card.scss'],
  templateUrl: './card.html'
})
export class Card implements OnInit {
  @Input() document: any;
  @Input() randomHeight:boolean;
  @Input() width:number;
  @Input() imageHeight:number;
  @Input() styleNumber:number;
  image:any;
  date:any;
  category:any;
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
    if (string !== undefined) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return '';
  }
  private loaded: boolean = false;

  constructor(
    private prismic: PrismicService,
    @Inject('LinkResolver') private linkResolver: {(doc: any): string}
  ) {}

  ngOnInit() {
    this.image = this.document.getImage('article.post-image');
    if(this.randomHeight){
      this.imageHeight = this.getRandomInt(300,450);
    } 
    this.date = this.document.getDate('article.date');
    this.category = this.document.getLink('article.link');
    this.title = this.document.getStructuredText('article.title');
    this.paragraph = this.document.getFirstParagraph();
    this.desc = this.paragraph !==null?this.paragraph.text:'';
    if(this.desc.length >= this.limit){
      this.desc = this.desc.substring(0,this.limit);
      this.desc = this.desc.substring(0,Math.min(this.desc.length,this.desc.lastIndexOf(' ')))+'...';
      this.isMore = true;
    }
  }

}
