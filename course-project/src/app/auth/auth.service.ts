import * as firebase from 'firebase';

export class AuthService {

    private token: string;

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => console.log(error));
    }

    signinUser(email: string, password: string) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                (response) => {
                    this.refreshToken();
                }
            )
            .catch((error) => {
                throw error;
            });
    }

    getToken(): string {
        this.refreshToken();
        return this.token;
    }

    private refreshToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => {
                    this.token = token;
                }
            );
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }
}
