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
        let headers = new Headers({
            'Accept': '*/*'
        });
        
        try {
            return this
                .http
                .request('http://127.0.0.1:8081/https://www.instagram.com/kristabirlslikesagirls/media/',{
                    method:'GET',
                    headers
                })
                .map((res) => res.json().items);
        } catch (err) {
            console.log(err);
            return null;
        }
    }

}