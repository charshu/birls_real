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
  image:any;
  imageUrl:string;
  imageHeight:number;

  date:any;
  link:any;
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
    private prismic: PrismicService,
    @Inject('LinkResolver') private linkResolver: {(doc: any): string}
  ) {}

  ngOnInit() {
    this.image = this.document.getImage('article.post-image');
    this.imageUrl = this.image !== null?this.image.url:'';
    this.imageHeight = this.getRandomInt(300,500);
    
    this.date = this.document.getDate('article.date');
    this.link = this.document.getLink('article.link');
    // console.log(this.link);
    this.category = this.link !==null?this.link.slug:'';
    
    this.title = this.document.getStructuredText('article.title');
    this.titleText = this.title !== null?this.title.getTitle().text:''

    //desc
    this.paragraph = this.document.getFirstParagraph();
    this.desc = this.paragraph !==null?this.paragraph.text:'';
    //trim
    if(this.desc.length >= this.limit){
      this.desc = this.desc.substring(0,this.limit);
      this.desc = this.desc.substring(0,Math.min(this.desc.length,this.desc.lastIndexOf(' ')))+'...';
      this.isMore = true;
    }
 
   // console.log(this.document);
   // console.log(this.title.getTitle());
  }

}
