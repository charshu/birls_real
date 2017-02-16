import { Component, Inject, AfterViewInit,OnDestroy } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../../prismic';
import { Prismic } from 'prismic.io';

@Component({
  templateUrl: './card-board.html',
  styleUrls: ['./card-board.scss']
})
export class CardBoardComponent implements OnInit, AfterViewInit,OnDestroy {
  documents: Array<any>;
  list_documents: Array<any>;
  private sub: any;
  queryTitle: string = '';
  category: string = '';
  description:string;
  image: any;
  imageUrl: string = '';
  imageHeight: number = 0;
  current_size = 0;
  card_per_row = 3; //1,2,3,4,6,12
  card_per_page = 9;
  tags = ['menswear','mensfashion','menstyle','mensstyle','menfashion','trend','trendy','trends','trending','style','pink','outfit','fashionweek']; 
  loaded: boolean = false;
  tag: any;
  loadingImg:boolean;
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  more() {
    this.card_per_page += 3;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
    @Inject('LinkResolver') private linkResolver: { (doc: any): string }
  ) {

    this.sub = this.route.params.subscribe(params => {
       this.loaded = false;
      if (params['category'] !== undefined) {
        this.category = params['category'];
        if(this.category === 'all'){
          prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'article')], { orderings: '[my.article.date desc]','fetchLinks': 'category.name' })).then((response) => {
            this.documents = response.results;
            this.queryTitle = this.category;
            this.loaded = true;
          });
        }else{
          prismicService.api().then((api) => api.getByUID('category', this.category)).then((document) => {
          this.loadingImg = false;
          const categoryID = document.id;
          this.image = document.getImageView('category.cover', 'cover');
          this.description = document.getText('category.description');
          prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'article'),
          Prismic.Predicates.at('my.article.link', categoryID)], { orderings: '[my.article.date desc]','fetchLinks': 'category.name' })).then((response) => {
            this.documents = response.results;
            this.queryTitle = this.category;
           
            this.loaded = true;
          });
        });
        }
        
      } else if (params['tagname'] !== undefined) {
        this.tag = params['tagname'];
        prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'article'),
         Prismic.Predicates.at('document.tags', [this.tag])], { orderings: '[my.article.date desc]','fetchLinks': 'category.name' })).then((response) => {
          this.documents = response.results;
          this.queryTitle = this.tag;
          this.loaded = true;
        });

      }
    })
  }
  ngAfterViewInit() {

  }
  ngOnInit() {
    document.body.scrollTop = 0;
   

  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}