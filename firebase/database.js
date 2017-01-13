import * as firebase from "firebase";

class Database {
	static uid = "";
	static firebaseRef = null;
	static booksRef = null;
	
	static books = null;
	
	static initializeUid(uid) {
		this.uid = uid;
		if(this.uid != "") {
			this.booksRef = this.firebaseRef.child("users").child(this.uid).child("books");
		}
	}
		
	static initializeFirebaseRef(firebaseRef) {
		this.firebaseRef = firebaseRef;
	}
	
	static addBook(book) {
		this.booksRef.child(book.uuid).set(book);
	}
	
	static updateBook(book) {
		this.booksRef.child(book.uuid).update(book);
	}
	
	static deleteBook(uuid) {
		this.booksRef.child(uuid).remove();
	}
	
	static initializeBooks(books) {
		this.books = books;
	}
	
	static getBooks() {
		return this.books;
	}

}

module.exports = Database;