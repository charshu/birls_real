import { Component, Inject, AfterViewInit } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../../prismic';
import { Prismic } from 'prismic.io';


@Component({
  templateUrl: './otherseason-board.html',
  styleUrls: ['./otherseason-board.scss']
})
export class OtherSeasonComponent implements OnInit, AfterViewInit {
  document: any;
  documents: Array<any>;
  brand: any;
  showDate: boolean = false;
  private sub: any;
  card_per_page = 12;
  uid:boolean;
  loaded: boolean = false;

 capitalizeFirstLetter(string) {
    if (string !== undefined) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return 'error';
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
    this.sub = this.route.parent.params.subscribe(params => {
      const uid = params['uid'];
      this.uid = uid;
      // console.log(uid);
      this.prismicService.api().then((api) => api.getByUID('collection', uid, { 'fetchLinks': 'brand.name' })).then((res) => {
        this.document = res;
        this.brand = res.getLink('collection.brand');
        this.prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'collection'),
        Prismic.Predicates.at('my.collection.brand', this.brand.id)],
          { orderings: '[my.collection.brand desc]','fetchLinks': ['brand.name','season.name']  })).then((response) => {
              this.documents = response.results;
        
              console.log(this.documents);
              this.loaded = true;
          });
      });
    })


  }
  ngAfterViewInit() {

  }
  ngOnInit() {
    document.body.scrollTop = 0;
    this.loaded = false;


  }
}