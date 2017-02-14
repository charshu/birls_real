import { Component, Input, Inject, OnInit, AfterViewInit, OnDestroy, OpaqueToken } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../../prismic';


@Component({
  selector: 'gallery',
  styleUrls: ['./gallery.scss'],
  templateUrl: './gallery.html'
})
export class Gallery implements OnInit, AfterViewInit, OnDestroy {

  sub: any;
  document: any;
  groupImages: any;
  loaded: boolean;
  openModalWindow: boolean = false;
  imagePointer: number;
  @Input() images: {
    thumb: string,
    img: string,
    description: string
  }[] = [];

  OpenImageModel(imageSrc, images) {
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

  constructor(
    private router: Router,
    private prismicService: PrismicService,
    private route: ActivatedRoute,
    @Inject('LinkResolver') private linkResolver: { (doc: any): string }
  ) {
    this.sub = this.route.parent.params.subscribe(params => {
      const uid = params['uid'];
      // console.log(params);
      
      prismicService.api().then((api) => api.getByUID('collection', uid, { 'fetchLinks': ['brand.name', 'season.name'] })).then((res) => {
        this.document = res;
        // console.log(res);
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

        }
        this.loaded = true;
      });
    }
    );

  }

  ngOnInit() {
      document.body.scrollTop = 0;
  }
  ngAfterViewInit() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
