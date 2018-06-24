import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    ngOnInit(): void {
        firebase.initializeApp({
            apiKey: 'AIzaSyCx0aU3UrtT6e4MzlM7iVVUPbyxsuySbvo',
            authDomain: 'ng-recipe-book-39c77.firebaseapp.com'
        });
    }

}
