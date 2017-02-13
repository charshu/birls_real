import {Component, Inject, OnInit} from '@angular/core';
import {PrismicService} from '../prismic';
import {ActivatedRoute} from '@angular/router';
import { Prismic } from 'prismic.io';
@Component({
  selector: 'home',
  styleUrls: ['./home.scss'],
  templateUrl: './home.html'
})
export class Home implements OnInit {
  documents: Array<any>;
  images:any;
  constructor(
    private prismicService: PrismicService,
    @Inject('LinkResolver') private linkResolver: {(doc: any): string}
  ) {
    
  }

  ngOnInit() {
    this.prismicService.api().then((api) => api.query([Prismic.Predicates.at('document.type', 'slider')])).then((response) => {
      this.documents = response.results;
      console.log(this.documents);
      this.images = this.documents[0].getGroup('slider.images').toArray();
    });
   
  }

}
