import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { auth } from 'firebase/app';

export interface IUser {
	mail: string;
	uid: string;
}

@Injectable({
	providedIn: 'root'
})
export class UserService {
	user: IUser;
	constructor(private afAuth: AngularFireAuth) { }

	setUser(user: IUser) {
		this.user = user;
	}

	getUsername(): string {
		return this.user.mail;
	}
	getUserEMail(): string {
		return this.user.mail + 'codedamn.com';
	}
	reAuth(mail: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(mail + '@codedamn.com', password));
	}

	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword);
	}

	updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail + '@codedamn.com');
	}

	async isAuthenticated() {
		console.log('isAuthenticated');
		if (this.user) { return true; }
		const user = await this.afAuth.authState.pipe(first()).toPromise();
		if (user) {
			this.setUser({
				mail: user.email.split('@')[0],
				uid: user.uid
			});
			return true;
		}
		return false;
	}

	getUID(): string {
		return this.user.uid;
	}
}
