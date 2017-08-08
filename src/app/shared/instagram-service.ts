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
        let CORS_HOST = 'http://52.221.253.11:8081';
        let IG_API = '/https://www.instagram.com/kristabirlslikesagirls/media/';
        // if(process.env.NODE_ENV === 'production'){
        //     CORS_HOST = 'http://birlsmagazine.com/https://www.instagram.com/kristabirlslikesagirls/media/';
        // }
        // else if(process.env.NODE_ENV === 'uat'){
        //     CORS_HOST = 'http://birlsmagazine.com:'+ process.env.CORS_PORT +'/https://www.instagram.com/kristabirlslikesagirls/media/';
        // } else {
        //     CORS_HOST = 'http://0.0.0.0:'+ process.env.CORS_PORT +'/https://www.instagram.com/kristabirlslikesagirls/media/';
        // }
        try {
            return this
                .http
                .request(CORS_HOST + IG_API,{
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