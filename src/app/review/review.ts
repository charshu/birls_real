import { Component, Input, Inject, OnInit, AfterViewInit, OnDestroy, OpaqueToken } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { PrismicService } from '../prismic';

@Component({
  selector: 'review',
  styleUrls: ['./review.scss'],
  templateUrl: './review.html'
})


export class Review implements OnInit, AfterViewInit, OnDestroy {
  uid: string;
  private sub: any;
  private document: any;
  private loaded: boolean = false;
  
  title: any;
  category: string;
  date: any;
  image: any;
  imageAspect: any;
  slices: any;
  tags: any;
  author:string;
  public page_url = "http://www.google.com";
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
    return 'error';
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismic: PrismicService,
    @Inject('LinkResolver') private linkResolver: { (doc: any): string }
  ) {
    this.sub = this.route.parent.params.subscribe(params => {
      const uid = params['uid'];
      this.prismic.api().then((api) => api.getByUID('collection', uid)).then((res) => {
        this.document = res;
        
        this.title = res.getStructuredText('collection.title');
        this.author = res.getText('collection.author');
        this.date = res.getDate('collection.date');
        this.slices = res.getSliceZone('collection.body').slices
        this.tags = res.tags;
        this.loaded = true;
        
        
      });

    })
  }

  ngOnInit() {




  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

}

