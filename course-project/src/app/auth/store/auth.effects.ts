import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import {mergeMap, switchMap, tap} from 'rxjs/operators';
import {from} from 'rxjs';
import * as firebase from 'firebase';
import {Router} from '@angular/router';


@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
        .ofType(AuthActions.TRY_SIGNUP)
        .pipe(switchMap(
            (action: AuthActions.TrySignup) => {
                return from(firebase.auth().createUserWithEmailAndPassword(action.payload.username, action.payload.password));
            }),
            switchMap(
                () => {
                    return from(firebase.auth().currentUser.getIdToken());
                }),
            mergeMap(
                (token: string) => {
                    return [
                        new AuthActions.Signup(),
                        new AuthActions.SetToken(token)
                    ];
                }
            ));

    @Effect()
    authSignin = this.actions$
        .ofType(AuthActions.TRY_SIGNIN)
        .pipe(switchMap(
            (action: AuthActions.TrySignin) => {
                return from(firebase.auth().signInWithEmailAndPassword(action.payload.username, action.payload.password));
            }),
            switchMap(
                () => {
                    return from(firebase.auth().currentUser.getIdToken());
                }),
            mergeMap(
                (token: string) => {
                    this.router.navigate(['/']);
                    return [
                        new AuthActions.Signin(),
                        new AuthActions.SetToken(token)
                    ];
                }
            ));

    @Effect({dispatch: false})
    authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .pipe(tap(
            () => this.router.navigate(['/'])
        ));

    constructor(private router: Router,
                private actions$: Actions) {
    }
}
