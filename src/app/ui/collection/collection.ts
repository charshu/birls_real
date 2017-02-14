import { Component, Input, Inject, OnInit, AfterViewInit, OnDestroy, OpaqueToken } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../../prismic';


@Component({
  selector: 'collection',
  styleUrls: ['./collection.scss'],
  templateUrl: './collection.html'
})
export class Collection implements OnInit, AfterViewInit, OnDestroy {



  @Input() uid: string;
  private sub: any;
  private document: any;
  private loaded: boolean = false;
  enable: boolean;
  date: any;
  brand: any;
  season: any;


  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
    @Inject('LinkResolver') private linkResolver: { (doc: any): string }
  ) {
    this.sub = this.route.params.subscribe(params => {
      const uid = params['uid'];
      prismicService.api().then((api) => api.getByUID('collection', uid, { 'fetchLinks': ['brand.name', 'season.name'] })).then((res) => {
        this.document = res;
        this.enable = res.getText('collection.enable-review') === 'yes' ? true : false;
        this.date = this.document.getDate('collection.date');
        this.season = this.document.getLink('collection.season');
        this.brand = this.document.getLink('collection.brand');
        this.loaded = true;
      });
    })

  }

  ngOnInit() {
    //get last word in route path
    document.body.scrollTop = 0;
  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
