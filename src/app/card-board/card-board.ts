import {Component,Inject} from "@angular/core";
import {OnInit} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import {PrismicService} from '../prismic';
import { Prismic } from 'prismic.io';


@Component({
    templateUrl: './card-board.html',
    styleUrls:[ './card-board.scss' ]
})
export class CardBoardComponent implements OnInit {

documents: Array<any>;
list_documents: Array<any>;
private sub: any;
category:string;
image:any;
imageUrl:string ;
imageHeight:number;
current_size = 0;
card_per_page = 3; 
loaded:boolean = false;
//social share
public fbUrl = 'https://www.facebook.com/birlsmagazine';
public twUrl = 'https://www.facebook.com/birlsmagazine';

capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

more(){
    this.card_per_page += 3;
  }

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
    @Inject('LinkResolver') private linkResolver: {(doc: any): string}
  ) {
    
    this.sub = this.route.params.subscribe(params => {
        this.loaded = false;
        console.log(this.loaded);
        this.category = params['category'];
          prismicService.api().then((api) => api.getByUID('category',this.category)).then((document) => {
            const categoryID = document.id;
            this.image = document.getImage('category.cover');
            this.imageUrl = this.image !== null?this.image.url:'';
              prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'article'),
              Prismic.Predicates.at('my.article.link', categoryID)],{ orderings : '[my.article.date desc]'})).then((response) => {
                this.card_per_page = 3; 
                this.documents = response.results;
                this.loaded = true;
               // console.log(this.documents.length);
                console.log(this.loaded);
        });
      }); 
    })
  }

    ngOnInit() {
        this.loaded = false;
    }
}