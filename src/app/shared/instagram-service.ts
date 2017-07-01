import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {IGImage} from './type.d'

@Injectable()
export class InstagramService {
    public redirectUrl : string;
    constructor(private http : Http, private router : Router) {
        console.log('instagram services init');
    }

    public getPictures() : Observable < IGImage[] > {

        try {
            return this
                .http
                .get('https://www.instagram.com/chizzwz/media/')
                .map((res) => res.json().items);
        } catch (err) {
            console.log(err);
            return null;
        }
    }

}