import {Component} from '@angular/core';


@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.html',
    styleUrls: ['./nav-bar.scss']
})


export class NavBar {

    tabs = [{
        label:'Fashion',
        links:[{
            label:'Shopping',
            url:'fashion/shopping'
        },
        {
            label:'Trends',
            url:'fashion/trends'
        },
        {
            label:'Style du Jours',
            url:'fashion/style-du-jours'
        },
        {
            label:'Editorial',
            url:'fashion/editorial'
        },
        {
            label:'Fashion mood board',
            url:'fashion/mood-board'
        }],
        items:[{
            img:'./../../resources/img/lights.jpg',
            desc:'The titles of Washed Out\'s breakthrough song and the first single from Paracosm share the two most '
        }, {
            img:'./../../resources/img/grass.jpg',
            desc:'The titles of Washed Out\'s breakthrough song and the first single from Paracosm '
            + 'share the two most'
        }],
        active:false
    }, {
        label:'Weird and Quirky',
        links:[],
        active:false
    }, {
        label:'Beauty',
        links:[],
        active:false
    }, {
        label:'Runway',
        link : 'runway',
        links:[],
        active:false
    }, {
        label:'<i class="fa fa-shopping-bag" aria-hidden="true"></i> Shop',
        links:[],
        active:false
    }];
    lastIndex:number = -1;
    backdrop:boolean = false;
    setActive(i:number) {
         //console.log('mouseenter last' + this.lastIndex);
         if (this.lastIndex === i) {
             return;
         }
        if (this.lastIndex !== -1) {
            this.tabs[this.lastIndex].active = false;
        }else {
            //when mouse enter close all opening tabs before pop new tab
            for ( let i:number = 0; i < (this.tabs).length ; i++) {
               this.tabs[i].active = false;
           }
        }
        this.lastIndex = i;
        this.tabs[i].active = true;
        //turn on backdrop only dropdown menu has links
        if (this.tabs[i].links.length > 1) {
             this.backdrop = true;
        } else {
            this.backdrop = false;
        }

       // console.log('mouseenter current' + this.lastIndex);
    }

    isActive(i:number) {
        return this.tabs[i].active;
    }
    closeAll() {
      //  console.log('mouseleave current' + this.lastIndex);
        this.lastIndex = -1;
        
        setTimeout( () => {
        if (this.lastIndex === -1) {
           for ( let i:number = 0; i < (this.tabs).length ; i++) {
               this.tabs[i].active = false;
           }
           this.backdrop = false;
        }

        }, 200);

    }


}