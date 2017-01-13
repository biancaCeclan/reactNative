import * as firebase from "firebase";

class Firebase {
	static firebaseApp;

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebaseApp = firebase.initializeApp({
			apiKey: "AIzaSyCahuccIFV0sIqUMvGJC05_aYE6yCMywbE",
			authDomain: "bookmanagement-2915f.firebaseapp.com",
			databaseURL: "https://bookmanagement-2915f.firebaseio.com",
			storageBucket: "bookmanagement-2915f.appspot.com",
			messagingSenderId: "960960870117"
		});
		
		return firebaseApp;
    }

}

module.exports = Firebase;