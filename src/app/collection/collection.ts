import { Component, Input, Inject, OnInit, AfterViewInit, OnDestroy, OpaqueToken } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../prismic';


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
  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //angular2-image-popup
  openModalWindow: boolean = false;
  imagePointer: number;
  images: {
    thumb: string,
    img: string,
    description: string
  }[] = [];

  OpenImageModel(imageSrc, images) {
    //alert('OpenImages');
    var imageModalPointer;
    for (var i = 0; i < images.length; i++) {
      if (imageSrc === images[i].img) {
        imageModalPointer = i;
        console.log('jhhl', i);
        break;
      }
    }
    this.openModalWindow = true;
    this.images = images;
    this.imagePointer = imageModalPointer;
  }
  cancelImageModel() {
    this.openModalWindow = false;
  }



  groupImages: any;
  image: any;
  imageUrl: string;
  imageHeight: number;

  date: any;
  brand: any;
  season: any;

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
    private prismicService: PrismicService,
    @Inject('LinkResolver') private linkResolver: { (doc: any): string }
  ) {
    this.sub = this.route.params.subscribe(params => {
      const uid = params['uid'];

      prismicService.api().then((api) => api.getByUID('collection', uid)).then((res) => {
        this.document = res;
        console.log(res);
        this.groupImages = this.document.getGroup('collection.gallery').toArray();
        for (let i = 0; i < this.groupImages.length; i++) {
          let temp = this.groupImages[i].getFirstImage();
          if (temp !== null && temp !== undefined) {
            this.images.push({
              thumb: temp.getView('thumb') !== undefined ? temp.getView('thumb').url : 'http://www.yochuwa.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg',
              img: temp.url,
              description: this.groupImages[i].get('caption') !== null ? this.groupImages[i].get('caption').asText() : ''
            });
          }
          // console.log(this.groupImages[i].get('caption').asText());
        }
        this.brand = this.document.getLink('collection.brand');
        this.brand = this.brand !== null ? this.brand.slug : '';
        this.date = this.document.getDate('collection.date');

        prismicService.api().then((api) => api.getByUID('season', this.document.getLink('collection.season').uid)).then((res) => {
          this.season = res;
          console.log(this.season.getText('season.name'));
          this.loaded = true;
        });
      });
    })
    this.page_url = "http://www.google.com";
  }

  ngOnInit() {




  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {

  }

}
