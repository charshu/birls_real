import { Component, Input, Inject, OnInit, AfterViewInit, OnDestroy, OpaqueToken } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { PrismicService } from '../../prismic';
import { Prismic } from 'prismic.io';
@Component({
  selector: 'myarticle',
  styleUrls: ['./article.scss'],
  templateUrl: './article.html'
})


export class Article implements OnInit, AfterViewInit, OnDestroy {
  _uid: string;
  private sub: any;
  private document: any;
  _documents: any;
  private loaded: boolean = false;
  title: any;
  category: string;
  date: any;
  image: any;
  imageAspect: any;
  slices: any;
  tags: any;
  author:any;
  maxRelatedDocs:number = 3;
  page_url = window.location.href;
  disqusShortname = 'birlmag';
  fbInner = `<div class=\"circle facebook\">
                <i class=\"fa fa-facebook\" aria-hidden=\"true\"></i>
              </div>`;
  twitterInner = `<div class="circle twitter">
                      <i class="fa fa-twitter" aria-hidden="true"></i>
                   </div>`;
  googleInner = `<div class="circle googlePlus">
                    <i class="fa fa-google-plus" aria-hidden="true"></i>
                </div>`;
  pintInner = `<div class="circle pinterest">
                    <i class="fa fa-pinterest" aria-hidden="true"></i>
                </div>`;
  inInner = `<div class="circle linkin">
                    <i class="fa fa-linkedin" aria-hidden="true"></i>
                </div>`;
  tumblrInner = `<div class="circle tumblr">
                    <i class="fa fa-tumblr" aria-hidden="true"></i>
                </div>`;
  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
  capitalizeFirstLetter(string) {
    if (string !== undefined) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return '';
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
    @Inject('LinkResolver') private linkResolver: { (doc: any): string }
  ) {}

  ngOnInit() {
    console.log(this.page_url);
    this.sub = this.route.params.subscribe(params => {
      const uid = params['uid'];
      this.category = params['category'];
      this.prismicService.api().then((api) => api.getByUID('article', uid)).then((res) => {
        this.document = res;
        this.title = res.getStructuredText('article.title');
        this.author = res.getText('article.author');
        this.date = res.getDate('article.date');
        this.image = res.getImage('article.post-image');
        this.slices = res.getSliceZone('article.body').slices
        this.tags = res.tags;
         this.prismicService.api().then((api) => api.query([Prismic.Predicates.similar(this.document.id, 3)
         ,Prismic.Predicates.at('document.type', 'article')], 
         { orderings: '[my.article.date desc]','fetchLinks': 'category.name'  })).then((response) => {
         this._documents = response.results;
          console.log(this._documents);
          this.loaded = true;
        });

      });

    })
  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

