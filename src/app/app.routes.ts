import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Document} from './document/document';
import {CardBoardComponent} from './card-board/card-board';


export const rootRouterConfig: Routes = [
  {path: '', component: Home},
  {path: 'fashion/:category', component: CardBoardComponent},
  {path: 'fashion/:category/:uid', component: Document}
  

];
