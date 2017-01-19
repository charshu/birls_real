import {Component} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Inject} from '@angular/core';


@Component({
  selector   : 'app',
  templateUrl: './app.html',
  styleUrls:['./app.scss']
})
export class AppComponent {

  public fbUrl = 'https://www.facebook.com/birlsmagazine';
  public twUrl = 'https://www.facebook.com/birlsmagazine';
  constructor(
    public http: Http, 
    @Inject('PrismicEndpoint') private endpoint: string,
  ) {}

  ngOnInit() {
    const repoEndpoint = this.endpoint.replace("/api", "");
    this.http.post(repoEndpoint + '/app/settings/onboarding/run', {}, new Headers({"Content-Type": "application/x-www-form-urlencoded", 'Access-Control-Allow-Origin': '*'})).subscribe(res=>null,error => null)
  }
}
