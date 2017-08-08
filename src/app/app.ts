import {Component, AfterViewInit} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Inject} from '@angular/core';
require("!style-loader!css-loader!sass-loader!resources/styles/index.scss");
require("!style-loader!css-loader!sass-loader!resources/font/_flaticon.scss");
require("!style-loader!css-loader!resources/font/bebas_neue.css");
require("!style-loader!css-loader!font-awesome/css/font-awesome.css");
require("!style-loader!css-loader!resources/styles/animations.css");
require("!style-loader!css-loader!resources/lib/angular2-image-popup/directives/angular2-image-popup/css/style.css");
require("!style-loader!css-loader!resources/lib/angular2-image-popup/app/assets/css/main.css");




@Component({
  selector   : 'app',
  templateUrl: './app.html',
  styleUrls:['./app.scss']
})
export class AppComponent{

  public fbUrl = 'https://www.facebook.com/birlsmagazine';
  public twUrl = 'https://www.facebook.com/birlsmagazine';
  tags = ['#menswear','#mensfashion','#menstyle','#mensstyle','#menfashion','#trend','#trendy' 
,'#trends','#trending','#style','#pink','#outfit','#fashionweek','#hautecouture']; 




  constructor(public http: Http, 
    @Inject('PrismicEndpoint') private endpoint: string) {}
 
  ngOnInit() {
    const repoEndpoint = this.endpoint.replace("/api", "");
    let headers = new Headers({"Content-Type": "application/x-www-form-urlencoded", 'Access-Control-Allow-Origin': '*'});
    
    this.http.post(repoEndpoint + '/app/settings/onboarding/run', {},{ headers } ).subscribe(res=>null,error => null)
  }
}
