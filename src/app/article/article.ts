import { Component, Input, Inject, OnInit, AfterViewInit, OnDestroy, OpaqueToken } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../prismic';

@Component({
  selector: 'myarticle',
  styleUrls: ['./article.scss'],
  templateUrl: './article.html'
})
export class Article implements OnInit, AfterViewInit, OnDestroy {
  @Input() uid: string;
  private sub: any;
  private document: any;
  private loaded: boolean = false;

  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  title: any;
  titleText: string;
  category:string;
  date: any;

  //image:any ;
  imageUrl: string;
  imageAspect: any;

  @Input() imageWithCaption: any;

  slices: any;
  tags:any;

  public page_url;
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismic: PrismicService,
    @Inject('LinkResolver') private linkResolver: { (doc: any): string }
  ) { }

  ngOnInit() {


    this.sub = this.route.params.subscribe(params => {
      const uid = params['uid'];
      this.category = params['category'];
      this.prismic.api().then((api) => api.getByUID('article', uid)).then((res) => {
        this.document = res;
        console.log(this.document);
        
        let title = res.getStructuredText('article.title');
        this.titleText = title !== null ? title.getTitle().text : ''
        this.date = res.getDate('article.date');

        let image = res.getImage('article.post-image');
        //console.log(image);
        this.imageUrl = image !== null ? image.url : '';
        this.imageAspect = this.calculateAspectRatioFit(image.main.width, image.main.height, document.getElementById('left-container').clientWidth - 40, 500);

        this.slices = res.getSliceZone('article.body').slices
        //console.log(this.slices);
        this.tags = res.tags;
        console.log(this.tags);
        this.loaded = true;
      });
    })

    //url to display share count
    this.page_url = "http://www.google.com";
  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

}
