import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {AppState} from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import {switchMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
            .pipe(take(1))
            .pipe(switchMap(
                (authState: fromAuth.State) => {
                    const requestCopy = req.clone({
                        params: req.params.set('auth', authState.token)
                    });
                    return next.handle(requestCopy);
                }
            ));
    }

}
