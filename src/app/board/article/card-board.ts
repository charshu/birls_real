import {
  Component,
  Inject,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import {
  OnInit
} from "@angular/core";
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  PrismicService
} from '../../prismic';
import {
  Prismic
} from 'prismic.io';

@Component({
  templateUrl: './card-board.html',
  styleUrls: ['./card-board.scss']
})
export class CardBoardComponent implements OnInit, AfterViewInit, OnDestroy {
  documents: Array < any > ;
  list_documents: Array < any > ;
  sub: any;
  queryTitle: string = '';
  category: string = '';
  description: string;
  image: any;
  imageUrl: string = '';
  imageHeight: number = 0;
  current_size = 0;

  filterCategory : any = 'all';
  tags = ['menswear', 'mensfashion', 'menstyle', 'mensstyle', 'menfashion', 'trend', 'trendy', 'trends', 'trending', 'style', 'pink', 'outfit', 'fashionweek'];
  //masonry moodboard *width 1162
  fashion_moods = [{
    img:'./../../../resources/img/recommend-tags/ok-fashion.jpg',
    maxWidth:300,
    maxHeight:250,
    caption:'shoestastic!'
  },{
    img:'./../../../resources/img/recommend-tags/fashion2.jpg',
    maxWidth:300,
    maxHeight:290,
    caption:'the jewels season'
  },{
    img:'./../../../resources/img/recommend-tags/fashion3-1.jpg',
    maxWidth:420,
    maxHeight:350,
    caption:'denim days'
  },{
    img:'./../../../resources/img/recommend-tags/fashion4-1.jpg',
    maxWidth:340,
    maxHeight:250,
    caption:'for bagaholics only'
  },{
    img:'./../../../resources/img/recommend-tags/fashion5-1.jpg',
    maxWidth:300,
    maxHeight:250,
    caption:'make it casual chic'
  }];
  categoryQueryIds = {
    '/fashion/all': ['WHIp5ikAALg6MBFc', 'WHI-uykAAJJWMG0F', 'WWH5ZCcAAHxTShiq', 'WKMa4SUAADBCgKrr'],
    '/beauty/all': ['WKqliyYAAKRkYjfX', 'WKqmfSYAAHdmYjwG'],
    '/talent/all': ['WWHwCScAAHxTSe92', 'WWNkoScAAH-YUFZ6'],
    '/talent/crew': ['WWNkoScAAH-YUFZ6'],
    '/talent/kristabirlslikesagirls': ['WWHwCScAAHxTSe92'],
    '/life-style/all': ['WV0FKiUAAFUG3buM', 'WV0FXyUAAFYG3bx_','WV0FfiUAAJ4H3b0P','WV0I1SUAAFIG3cvo']

  };
  pageloaded: boolean = false;
  categoryLoaded = true;
  tag: any;
  loadingImg: boolean;
  isAll : boolean;
  page: number = 1;
  pageSize: number = 10;
  currentUrl: string;
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  more() {
    this.page++;
    this.getArticlesById(this.categoryQueryIds[this.router.url],this.page,this.pageSize).then(response => {
        this.documents = this.documents.concat(response.results);
       console.log(this.documents)
    })
    
  }
 

  getArticlesById(categoryIDs : string[],page,pageSize): Promise <any>{
    
    return this.prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'article'), Prismic.Predicates.any('my.article.link', categoryIDs)], {
            orderings: '[my.article.date desc]',
            fetchLinks: 'category.name',
            pageSize,
            page
          }));
    
  }
  changeFilterCategory(filterCategory) {
    this.categoryLoaded = false;
    setTimeout(()=>{
      this.filterCategory = filterCategory;
      this.categoryLoaded = true;
    },300)
  
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismicService: PrismicService,
    @Inject('LinkResolver') private linkResolver: {
      (doc: any): string
    }
  ) {

    
  }
  ngAfterViewInit() {

  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      
      this.pageloaded = false;
      this.image = null;
      document.body.scrollTop = 0;
      this.currentUrl = this.router.url;
      if (params['category']) {
        this.category = params['category'];
        console.log(this.category)
        // all
        if(this.category === 'all'){
          this.isAll = true;
          this.getArticlesById(this.categoryQueryIds[this.router.url],this.page,this.pageSize).then(response => {
            this.documents = response.results;
            this.pageloaded = true;
            this.categoryLoaded = true;
          });
          
          
        } else {
           this.prismicService.api().then((api) => api.getByUID('category',this.category)).then((document) => {
            this.isAll = false;
            this.loadingImg = false;
            const categoryID = document.id;
            console.log(categoryID)
            this.image = document.getImageView('category.cover', 'cover');
            this.description = document.getText('category.description');
            this.queryTitle = document.getText('category.name');
            this.getArticlesById([categoryID],this.page,this.pageSize).then(response => {
              this.documents = response.results;
              this.pageloaded = true;
            });
            

            
            
          });
        }
            

      } else if (params['tagname']) {
        this.tag = params['tagname'];
        this.prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'article'),
          Prismic.Predicates.at('document.tags', [this.tag])
        ], {
          orderings: '[my.article.date desc]',
          'fetchLinks': 'category.name'
        })).then((response) => {
          this.documents = response.results;
          this.queryTitle = this.category;
          this.pageloaded = true;
        });

      }

      
      
    })


  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}