import { Component, Input, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrismicService } from '../prismic';

@Component({
  selector: 'document',
  styleUrls: ['./document.css'],
  templateUrl: './document.html'
})
export class Document implements OnInit {
  @Input() uid: string;
  private sub: any;
  private document: any;
  private loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prismic: PrismicService,
    @Inject('LinkResolver') private linkResolver: {(doc: any): string}
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const uid = params['uid'];
      this.prismic.api().then((api) => api.getByUID('article',uid)).then((document) => {
        this.document = document;
        this.loaded = true;
      });
    })
  }

}
