import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Article } from './ui/article/article';
import { CardBoardComponent } from './board/article/card-board';
import { RunwayBoardComponent } from './board/collection/runway-board';
import { Collection } from './ui/collection/collection';
import { Gallery } from './ui/gallery/gallery';
import { Review } from './ui/review/review';
import { OtherSeasonComponent } from './board/otherseason/otherseason-board';
export const rootRouterConfig: Routes = [
  { path: '', component: Home },
  { path: 'fashion/:category', component: CardBoardComponent },
  { path: 'fashion/:category/:uid', component: Article },
  { path: 'beauty/:category', component: CardBoardComponent },
  { path: 'beauty/:category/:uid', component: Article },
  { path: 'birls/:category', component: CardBoardComponent },
  { path: 'birls/:category/:uid', component: Article },
  { path: 'life-style/:category', component: CardBoardComponent },
  { path: 'life-style/:category/:uid', component: Article },
  { path: 'tags/:tagname', component: CardBoardComponent },
  { path: 'runway', component: RunwayBoardComponent },
  {
    path: 'runway/:uid', component: Collection,
    children: [
      { path: '', redirectTo:'collection',pathMatch:'full' },
      { path: 'review', component: Review },
      { path: 'collection', component: Gallery },
      { path: 'otherseason', component: OtherSeasonComponent }
    ]
  }


];
