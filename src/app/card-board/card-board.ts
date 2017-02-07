import { Component, Inject, AfterViewInit } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../prismic';
import { Prismic } from 'prismic.io';


@Component({
  templateUrl: './card-board.html',
  styleUrls: ['./card-board.scss']
})
export class CardBoardComponent implements OnInit, AfterViewInit {
  selectedMenu: string = null;
  documents: Array<any>;
  list_documents: Array<any>;
  private sub: any;
  queryTitle: string = '';
  category: string = '';
  image: any;
  imageUrl: string = '';
  imageHeight: number = 0;
  current_size = 0;
  card_per_page = 3;
  loaded: boolean = false;
  tag: any;
  //social share
  public fbUrl = 'https://www.facebook.com/birlsmagazine';
  public twUrl = 'https://www.facebook.com/birlsmagazine';

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
      console.log(params);
      this.loaded = false;
      document.body.scrollTop = 0;
      // console.log(params['category']);
      if (params['category'] !== undefined) {
        this.selectedMenu = 'fashion';
        this.category = params['category'];
        prismicService.api().then((api) => api.getByUID('category', this.category)).then((document) => {
          const categoryID = document.id;
          this.image = document.getImage('category.cover');
          this.imageUrl = this.image !== null ? this.image.url : '';
          prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'article'),
          Prismic.Predicates.at('my.article.link', categoryID)], { orderings: '[my.article.date desc]' })).then((response) => {
            this.card_per_page = 3;
            this.documents = response.results;
            this.queryTitle = this.category;
            this.loaded = true;
            // console.log(this.documents.length);
            //console.log(this.loaded);
          });
        });
      } else if (params['tagname'] !== undefined) {
        this.selectedMenu = 'fashion';
        this.tag = params['tagname'];
        prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'article'), Prismic.Predicates.at('document.tags', [this.tag])], { orderings: '[my.article.date desc]' })).then((response) => {
          this.card_per_page = 3;
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
    this.loaded = false;
    
  }
}