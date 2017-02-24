import { NgModule, OpaqueToken } from '@angular/core'
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.routes";
import { AppComponent } from "./app";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { CeiboShare } from 'ng2-social-share';
import { Ng2ParallaxScrollModule } from 'ng2-parallax-scroll';
import { MasonryModule } from 'angular2-masonry';

import { PrismicService } from './prismic';
import { Home } from './home/home';
import { Article } from './ui/article/article';
import { Review } from './ui/review/review';
import { FilterPipe } from './board/collection/collection-filter.pipe'

import { DisqusModule } from "ng2-awesome-disqus";
import { ShareButtonsModule } from "ng2-sharebuttons";
import { MaterialModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CardBoardComponent } from './board/article/card-board'
import { RunwayBoardComponent } from './board/collection/runway-board';
import { OtherSeasonComponent } from './board/otherseason/otherseason-board';

import { NavBar } from './ui/nav-bar/nav-bar';
import { Card } from './ui/article-card/card';
import { CollectionCard } from './ui/collection-card/collection-card';
import { ImageModal } from './../resources/lib/angular2-image-popup/directives/angular2-image-popup/image-modal-popup';
import {Collection} from './ui/collection/collection';
import {Gallery} from './ui/gallery/gallery';
import { TruncatePipe } from './app.pipe';
import { LazyLoadImageModule } from 'ng2-lazyload-image';
// Use the endpoint of your repository
const ENDPOINT = 'https://charshu.prismic.io/api';
// Specify an access token if your API is set to private
const ACCESS_TOKEN = null;
// Customize this to match your routing pattern

const APP_CONFIG_DATA = {
  server_ip_addr: 'http://localhost:8080'
}
const APP_CONFIG_TOKEN = new OpaqueToken('config');

function linkResolver(doc: any) {

  if (doc.type === 'article') {
    const category = doc.getLink('article.link').uid;
    //menu fashion
    if (category === 'shopping' || category === 'trends' || category === 'editorial' || category === 'style-du-jours') {
      return `/fashion/` + category + `/` + encodeURIComponent(doc.uid);
    } else if (category === 'make-up' || category === 'skin-care') {
      return `/beauty/` + category + `/` + encodeURIComponent(doc.uid);
    }

  } else if (doc.type === 'category') {
    const category = doc.uid;
    if (category === 'shopping' || category === 'trends') {
      return `/fashion/` + category;
    }
  } else if (doc.type === 'collection') {

    return `/runway/` + encodeURIComponent(doc.uid);

  }

  return `/${doc.type}/` + encodeURIComponent(doc.uid);
}

@NgModule({
  declarations: [
    AppComponent,
    Article,
    Home,
    NavBar,
    CardBoardComponent,
    Card,
    TruncatePipe,
    CeiboShare,
    RunwayBoardComponent,
    CollectionCard,
    ImageModal,
    Collection,
    Gallery,
    Review,
    OtherSeasonComponent,
    FilterPipe
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig),
    MomentModule,
    Ng2ParallaxScrollModule,
    DisqusModule,
    ShareButtonsModule,
    MaterialModule.forRoot(),
    NgbModule.forRoot(),
    MasonryModule,
    LazyLoadImageModule
  ],
  providers: [
    PrismicService,
    // {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: 'PrismicEndpoint', useValue: ENDPOINT },
    { provide: 'PrismicAccessToken', useValue: ACCESS_TOKEN },
    { provide: 'LinkResolver', useValue: linkResolver },
    { provide: APP_CONFIG_TOKEN, useValue: APP_CONFIG_DATA }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
