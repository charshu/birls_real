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
import { PrismicService } from './prismic';
import { Home } from './home/home';
import { Article } from './article/article';
// import {ShareButtonsModule} from 'ng2-sharebuttons';
import { CommentModule } from 'ng2-comment';
import { DisqusModule } from "ng2-awesome-disqus";
import { ShareButtonsModule } from "ng2-sharebuttons";


import { CardBoardComponent } from './card-board/card-board'
import { RunwayBoardComponent } from './runway-board/runway-board';
import { NavBar } from './ui/nav-bar/nav-bar';
import { Card } from './ui/card/card';
import { CollectionCard } from './ui/collection-card/collection-card';
import { ImageModal } from 'angular2-image-popup/directives/angular2-image-popup/image-modal-popup';
import {Collection} from './collection/collection';
import { TruncatePipe } from './app.pipe';
// Use the endpoint of your repository
const ENDPOINT = 'https://charshu.prismic.io/api';
// Specify an access token if your API is set to private
const ACCESS_TOKEN = null;
// Customize this to match your routing pattern

const APP_CONFIG_DATA = {
  server_ip_addr: 'http://localhost:9090'
}
const APP_CONFIG_TOKEN = new OpaqueToken('config');

function linkResolver(doc: any) {

  if (doc.type === 'article') {
    const category = doc.getLink('article.link').uid;
    //menu fashion
    if (category === 'shopping' || category === 'trends') {
      return `/fashion/` + category + `/` + encodeURIComponent(doc.uid);
    }

  }
  else if (doc.type === 'category') {
    const category = doc.uid;
    if (category === 'shopping' || category === 'trends') {
      return `/fashion/` + category;
    }
  }
  else if (doc.type === 'collection') {

    return `/runway/` + doc.getLink('collection.season').uid + '/' + doc.getLink('collection.brand').uid + '/' + encodeURIComponent(doc.uid);

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
    Collection
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig),
    MomentModule,
    Ng2ParallaxScrollModule,
    CommentModule,
    DisqusModule,
    ShareButtonsModule
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
