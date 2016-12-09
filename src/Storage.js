import {
   AsyncStorage
} from 'react-native';
import {Book} from './Book';

export const readBook = async(title, callback) => await read(title, callback);
export const saveBook = async(book) => await save(book.title, book);
export const readAllBooks = async(callback) => await readAll(callback);
export const clearAllBooks = async() => await clearAll();
export const updateBook = async(book) => await update(book);
export const removeBook = async(title) => await remove(title);

export const save = async(key, object) => {
  await AsyncStorage.setItem(key, JSON.stringify(object));
}

export const read = async(key, callback) => {
  await AsyncStorage.getItem(key)
					.then(	(v1) => {
							var v = JSON.parse(v1);
							var book1 = new Book(v['title'], v['author'], v['pubYear'], v['price']);
							callback(book1);
					});
}

export const readAll = async(callback) => {
	await AsyncStorage.getAllKeys()
					  .then(	(ks) => {
									ks.forEach( k => read(k, callback))
					  });
}

export const clearAll = async() => {
	await AsyncStorage.clear();
}

export const update = async(book) => {
	await AsyncStorage.mergeItem(book.title, JSON.stringify(book));
}

export const remove = async(title) => {
	await AsyncStorage.removeItem(title);
} 