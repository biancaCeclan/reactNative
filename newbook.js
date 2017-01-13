import React, {Component} from 'react';
import {
   TouchableHighlight, 
   Image, 
   AppRegistry,
   StyleSheet, 
   Text, 
   View,
   TextInput,
   TouchableNativeFeedback,
   ToastAndroid,
   TouchableOpacity,
   DatePickerAndroid
} from 'react-native';

import Database from "./firebase/database.js";
var uuid = require('react-native-uuid');


class NewBook extends Component {
	constructor(props){
		super(props);
		this.state = {title : '', author : '', year: 'Publication year', price: ''};
	}
  
	saveBook() {
		var bookUuid = uuid.v4();
		var book = {title: this.state.title, author: this.state.author, pubYear: this.state.year, price: this.state.price, uuid: bookUuid}; 
		Database.addBook(book);
		this.props.callback(book);
		this.props.navigator.pop();
	};
	
	showPicker = async (options) => {
		try {
		  const {action, year} = await DatePickerAndroid.open(options);
		  if (action === DatePickerAndroid.dismissedAction) {
			
		  } else {
			var date = new Date(year, 1, 1);
			this.setState({
				year: year,
			});
		  }
		  
		} catch ({code, message}) {
			ToastAndroid.show('Error: ' + message, ToastAndroid.SHORT);
		}
	};
  
	render() {
		return (
			<View style={styles.container}>
				<TextInput placeholder='Title' onChangeText={(title) => this.setState({title})} value={this.state.title} />
				<TextInput placeholder='Author' onChangeText={(author) => this.setState({author})} value={this.state.author} />
				<TouchableOpacity
					onPress={this.showPicker.bind(this, {
					  date: new Date(),
					})}>
					<Text style={styles.text}>{this.state.year}</Text>
				</TouchableOpacity>
				<TextInput placeholder='Price' onChangeText={(price) => this.setState({price})} value={this.state.price} />
		 
				<TouchableNativeFeedback
					onPress={() => this.saveBook()}>
					<View style={styles.saveButton} >
						<Text style={styles.buttonText}>Save</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container:{
		flex:1,
		padding: 10,
		paddingTop:70,
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
  
export default NewBook;