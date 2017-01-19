import {NgModule} from '@angular/core'
import {RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {MomentModule} from 'angular2-moment';
import { CeiboShare } from 'ng2-social-share';
import {Ng2ParallaxScrollModule} from 'ng2-parallax-scroll';
import {PrismicService} from './prismic';
import {Home} from './home/home';
import {Document} from './document/document';

import {CardBoardComponent} from './card-board/card-board'
import {NavBar} from './ui/nav-bar';
import {Card} from './ui/card/card';

import {TruncatePipe}   from './app.pipe';
// Use the endpoint of your repository
const ENDPOINT = 'https://charshu.prismic.io/api';
// Specify an access token if your API is set to private
const ACCESS_TOKEN = null;
// Customize this to match your routing pattern
function linkResolver(doc: any) {
  
  if(doc.type === 'article'){
     const category = doc.getLink('article.link').uid;
     //menu fashion
     if(category === 'shopping' || category === 'trends'){
        return `/fashion/` + category + `/` + encodeURIComponent(doc.uid);
     }
     
  }
  else if(doc.type === 'category'){
     const category = doc.uid;
     if(category === 'shopping' || category === 'trends'){
     return `/fashion/` + category;
     }
  }
  return `/${doc.type}/`+ encodeURIComponent(doc.uid);
}

@NgModule({
  declarations: [AppComponent, Document, Home, NavBar, CardBoardComponent, Card, TruncatePipe, CeiboShare],
  imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig), MomentModule, Ng2ParallaxScrollModule],
  providers   : [
    PrismicService,
   // {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: 'PrismicEndpoint', useValue: ENDPOINT },
    { provide: 'PrismicAccessToken', useValue: ACCESS_TOKEN },
    { provide: 'LinkResolver', useValue: linkResolver }
  ],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
