import {Component, Inject, AfterViewInit} from "@angular/core";
import {OnInit} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';
import {PrismicService} from '../../prismic';
import {Prismic} from 'prismic.io';

@Component({
  templateUrl: './runway-board.html', 
  styleUrls: ['./runway-board.scss']
})
export class RunwayBoardComponent implements OnInit,
AfterViewInit {
  showDate : boolean = false;
  seasons : any;
  allSeasons : any;
  brands : any;
  allBrands : any;
  loadedSelect : any = false;
  selected = {
    season: 'all',
    brand: 'all'
  };
  documents : Array < any >;
  list_documents : Array < any >;
  private sub : any;
  queryTitle : string = '';
  category : string = '';
  image : any;
  imageUrl : string = './../../resources/img/runway.jpg';
  imageHeight : number = 0;
  current_size = 0;
  card_per_page = 12;
  loaded : boolean = false;
  tag : any;
  //social share
  public fbUrl = 'https://www.facebook.com/birlsmagazine';
  public twUrl = 'https://www.facebook.com/birlsmagazine';

  capitalizeFirstLetter(string) {
    return string
      .charAt(0)
      .toUpperCase() + string.slice(1);
  }

  more() {
    this.card_per_page += 3;
  }
  callSeason(seasonID) {
    console.log(seasonID);
    this.loadedSelect = false;

    if (seasonID === 'all') {
      this
        .prismicService
        .api()
        .then((api) => api.query([
          Prismic
            .Predicates
            .at('document.type', 'brand')
        ], {orderings: '[my.brand.name desc]'}))
        .then((response) => {
          this.brands = response.results;
          this.loadedSelect = true;
          // console.log(this.brands);
        });
      this.selected.season = 'all';

    } else {
      for (let i = this.brands.length - 1; i >= 0; i--) {
        if (this.brands[i].id !== this.selected.brand) {
          console.log('splice: ' + this.brands[i].getText('brand.name'));
          this
            .brands
            .splice(i, 1);
        }
      }
      this
        .prismicService
        .api()
        .then((api) => api.query([
          Prismic
            .Predicates
            .at('document.type', 'collection'),
          Prismic
            .Predicates
            .at('my.collection.season', seasonID)
        ], {
          orderings: '[my.collection.brand desc]',
          'fetchLinks': 'brand.name'
        }))
        .then((response) => {

          let temp = [];
          for (let doc of response.results) {
            let brand = doc.getLink('collection.brand');
            let brandName = brand.getText('brand.name');
            console.log(brandName);
            //dont push duplicating value
            if (temp.indexOf(brandName) < 0 && brand.id !== this.selected.brand) {
              temp.push(brandName);
              this
                .brands
                .push(brand);
            }
          }

          this.selected.season = seasonID;
          this.loadedSelect = true;
        });
    }
  }
  callBrand(brandID) {
    console.log(brandID);
    this.loadedSelect = false;

    if (brandID === 'all') {
      //save query time
      this
        .prismicService
        .api()
        .then((api) => api.query([
          Prismic
            .Predicates
            .at('document.type', 'season')
        ], {orderings: '[my.season.name desc]'}))
        .then((response) => {
          this.seasons = response.results;
          this.loadedSelect = true;
        });
      this.selected.brand = 'all';

    } else {
      for (let i = this.seasons.length - 1; i >= 0; i--) {
        if (this.seasons[i].id !== this.selected.season) {
          console.log('splice: ' + this.seasons[i].getText('season.name'));
          this
            .seasons
            .splice(i, 1);
        }
      }
      this
        .prismicService
        .api()
        .then((api) => api.query([
          Prismic
            .Predicates
            .at('document.type', 'collection'),
          Prismic
            .Predicates
            .at('my.collection.brand', brandID)
        ], {
          orderings: '[my.collection.season desc]',
          'fetchLinks': 'season.name'
        }))
        .then((response) => {

          let temp = [];
          for (let doc of response.results) {
            let season = doc.getLink('collection.season');
            let seasonName = season.getText('season.name');

            if (temp.indexOf(seasonName) < 0 && season.id !== this.selected.season) {
              temp.push(seasonName);
              this
                .seasons
                .push(season);
              console.log('push: ' + seasonName);
            }
          }
          this.selected.brand = brandID;
          this.loadedSelect = true;
        });
    }
  }

  filter(doc) {
    let season = doc.getLink('collection.season');
    let seasonName = season.getText('season.name');
    let brand = doc.getLink('collection.brand');
    let brandName = brand.getText('brand.name');
    if (this.selected.brand === 'all' && this.selected.season === 'all') {
      return true;
    } else if (this.selected.brand === 'all') {
      if (season.id === this.selected.season) 
        return true;
      else 
        return false;
      }
    else if (this.selected.season === 'all') {
      if (brand.id === this.selected.brand) 
        return true;
      else 
        return false;
      }
    else {
      if (brand.id === this.selected.brand && season.id === this.selected.season) 
        return true;
      else 
        return false;
      }
    
  }

  constructor(private route : ActivatedRoute, private router : Router, private prismicService : PrismicService, @Inject('LinkResolver')private linkResolver : {
    (doc : any): string
  }) {
    this.sub = this
      .route
      .params
      .subscribe(params => {
        this.loaded = false;
        document.body.scrollTop = 0;
        //query season,brand name
        prismicService.api().then((api) => api.query([
            Prismic.Predicates
              .at('document.type', 'season')
          ], {orderings: '[my.season.name desc]'}))
          .then((response) => {
            this.seasons = response.results;
         prismicService.api().then((api) => api.query([
           Prismic.Predicates.at('document.type', 'brand')
              ], {orderings: '[my.brand.name desc]'}))
              .then((response) => {
                this.brands = response.results;
                this.loadedSelect = true;
                prismicService.api()
                  .then((api) => api.query([
                    Prismic.Predicates
                      .at('document.type', 'collection')
                  ], {
                    orderings: '[my.collection.date desc]',
                    'fetchLinks': ['brand.name', 'season.name']
                  }))
                  .then((response) => {
                    this.documents = response.results;
                    console.log(this.documents);
                    this.loaded = true;

                  });
              });
          });
      })
  }
  ngAfterViewInit() {}
  ngOnInit() {
    document.body.scrollTop = 0;
    this.loaded = false;

  }
}