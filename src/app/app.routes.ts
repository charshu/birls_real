import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Article } from './article/article';
import { CardBoardComponent } from './card-board/card-board';
import { RunwayBoardComponent } from './runway-board/runway-board';
import { Collection } from './collection/collection';
import { Gallery } from './gallery/gallery';
import { Review } from './review/review';
import { OtherSeasonComponent } from './otherseason-board/otherseason-board';
export const rootRouterConfig: Routes = [
  { path: '', component: Home },
  { path: 'fashion/:category', component: CardBoardComponent },
  { path: 'fashion/:category/:uid', component: Article },
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
