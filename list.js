/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  TouchableOpacity,
  TouchableNativeFeedback,
  ToastAndroid,
  ScrollView,
  Linking,
  Alert
} from 'react-native';
import {readBook, saveBook, readAllBooks, clearAllBooks, updateBook, removeBook} from './src/Storage';
import {Book} from './src/Book';

import Database from "./firebase/database.js";

var BOOKS_DATA = [];

class BookList extends Component {
	constructor(props) {
		super(props);
		this.callbackFunctionNew = this.callbackFunctionNew	.bind(this);
		this.callbackFunction = this.callbackFunction.bind(this);
		
		this.callbackGetOne = this.callbackGetOne.bind(this);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			loaded: false,
		};
		
	}
	
	componentDidMount() {
		this.fetchData();
	}
	
	
	fetchData() {
		if(Database.booksRef !== null) {
			// when an object is added, changed, removed -> you get, from the Firebase SDK, the entire result set back as a DataSnapshot 
			Database.booksRef.on('value', (snap) => {
				// get children as an array
				var books = [];
				snap.forEach((child) => {
					books.push(child.val());
				});
			
				BOOKS_DATA = books.slice();
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(BOOKS_DATA),
				});
				Database.initializeBooks(books);
			});
		}
		
		this.setState({
			loaded: true,
        });
	}
	
	callbackFunction(args) {
		ToastAndroid.show('The Book was modified', ToastAndroid.SHORT);
	};
	
	callbackFunctionNew(args) {
			
		ToastAndroid.show('A book was inserted', ToastAndroid.SHORT);
	
		var body = 'The book : Book{title =' + args['title'] + ', author=' + args['author'] + ', publication year=' + args['pubYear'];
		var firstMailURL = 'mailto:bianca_ceclan@yahoo.com?subject=Book Insertion&body='.concat(body);
		var finalBoby = '} has been inserted.'
		var mailURL = firstMailURL.concat(finalBoby);
		Linking.openURL(mailURL).catch(err => console.error('An error occurred', err));
	}
	
	callbackGetOne(args) {
		BOOKS_DATA.push(args);
		
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(BOOKS_DATA),
        });
	}
	
	deleteBook(uuid) {
		Database.deleteBook(uuid);
	}
	
	render() {
	if (!this.state.loaded) {
		return this.renderLoadingView();
    }
	
    return (
	<ScrollView>
		<View>
			<ListView 
				style={styles.listView}
				enableEmptySections={true}
				dataSource={this.state.dataSource}
        
				renderRow={(data) => 
					<TouchableOpacity onPress={()=> this.props.navigator.push({index: 1,
						passProps:{
							title: data.title, 
							author: data.author,
							year: data.pubYear,
							price: data.price,
							uuid: data.uuid,
							callback: this.callbackFunction,
						},
						},)
					}
					onLongPress={()=> Alert.alert(
										  'Delete',
										  'Are you sure?',
										  [
											{text: 'Cancel'},
											{text: 'OK', onPress: () => this.deleteBook(data.uuid)},
										  ]
										)
					}
					 >
						<View>
							<Text style={styles.title}>{data.title}</Text>
							<Text>{data.author}</Text>
						</View>
					</TouchableOpacity>
				}
				renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
					<View key={rowID} style={{height:1, backgroundColor: 'lightgray'}}/>
				}
		
			/>
		</View>
		
		<View>
			<TouchableNativeFeedback onPress={()=> this.props.navigator.push({index: 2,
				passProps:{
					callback: this.callbackFunctionNew,
				}
			})}>
				<View style={styles.saveButton}>
					<Text style={styles.buttonText}>Add</Text>
				</View>
			</TouchableNativeFeedback>
		</View>
	</ScrollView>
    );
  }
  
	renderLoadingView() {
		return (
			<View style={styles.container}>
				<Text>
					Loading book...
				</Text>
			</View>
		);
	}
 
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
	},
	title: {
		fontSize: 20,
	},
	listView: {
		paddingTop: 60,
		backgroundColor: '#F5FCFF',
	},
	separator: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#8E8E8E',
	},
	saveButton: {
		backgroundColor: 'lightblue',
		width: 100,
		height: 50
	},
	buttonText: {
		textAlign: 'center',
	}
});

export default BookList;
