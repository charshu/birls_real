import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Article} from './article/article';
import {CardBoardComponent} from './card-board/card-board';
import {RunwayBoardComponent} from './runway-board/runway-board';
import {Collection} from './collection/collection';
export const rootRouterConfig: Routes = [
  {path: '', component: Home},
  {path: 'fashion/:category', component: CardBoardComponent},
  {path: 'fashion/:category/:uid', component: Article},
  {path: 'tags/:tagname' , component: CardBoardComponent},
  {path: 'runway', component : RunwayBoardComponent},
  {path: 'runway/:season/:brand/:uid', component : Collection}
  

];
