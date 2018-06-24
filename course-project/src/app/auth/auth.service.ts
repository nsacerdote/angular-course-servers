import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {AppState} from '../store/app.reducers';
import {Store} from '@ngrx/store';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {

    constructor(private store: Store<AppState>) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                () => {
                    this.store.dispatch(new AuthActions.Signup());
                    this.refreshToken();
                }
            )
            .catch((error) => console.log(error));
    }

    signinUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                () => {
                    this.store.dispatch(new AuthActions.Signin());
                    this.refreshToken();
                }
            )
            .catch((error) => {
                throw error;
            });
    }

    private refreshToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => {
                    this.store.dispatch(new AuthActions.SetToken(token));
                }
            );
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.Logout());
    }
}
