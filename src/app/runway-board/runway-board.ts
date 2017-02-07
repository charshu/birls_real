import { Component, Inject, AfterViewInit } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../prismic';
import { Prismic } from 'prismic.io';


@Component({
  templateUrl: './runway-board.html',
  styleUrls: ['./runway-board.scss']
})
export class RunwayBoardComponent implements OnInit, AfterViewInit {

  seasons:any;
  brands:any;
  order = {
    season: 'all',
    brand: 'all'
  };

  callSeason(value) {
    console.log(value);
    this.order.season = value;
  }
  callBrand(value) {
    console.log(value);
    this.order.brand = value;
  }
  documents: Array<any>;
  list_documents: Array<any>;
  private sub: any;
  queryTitle: string = '';
  category: string = '';
  image: any;
  imageUrl: string = './../../resources/img/bg.jpg';
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
      // console.log(params);
      this.loaded = false;
      document.body.scrollTop = 0;

      //query season,brand name
      prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'season')],
        { orderings: '[my.season.name desc]' })).then((response) => {
          this.seasons = response.results;
          // console.log(this.seasons);
        });

      prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'brand')],
        { orderings: '[my.brand.name desc]' })).then((response) => {
          this.brands = response.results;
          // console.log(this.brands);
        });

      prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'collection')], { orderings: '[my.collection.date desc]' })).then((response) => {
        this.card_per_page = 3;
        this.documents = response.results;
        this.loaded = true;
        // console.log(this.documents);

      });

    })
  }
  ngAfterViewInit() {

  }
  ngOnInit() {
    this.loaded = false;

  }
}