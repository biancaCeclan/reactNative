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
   TouchableOpacity,
   ToastAndroid,
   DatePickerAndroid
} from 'react-native';
import {Book} from './src/Book';
import { SimpleChart } from './chart.js'

class BookDetail extends Component {
	constructor(props){
		super(props);
		this.state = {author : props.author, year : props.year, price: props.price};
	}
  
	editBook() {
		var book = new Book(this.props.title, this.state.author, this.state.year, this.state.price);
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
				<Text>{this.props.title}</Text>
		 
				<TextInput 
					onChangeText={(author) => this.setState({author})}
					value={this.state.author}/>
			
				<TouchableOpacity
					onPress={this.showPicker.bind(this, {
					  date: new Date(this.state.year, 1, 1),
					})}>
					<Text style={styles.text}>{this.state.year}</Text>
				</TouchableOpacity>
				
				<TextInput
					onChangeText={(price) => this.setState({price})}
					value={this.state.price}/>
				
				<TouchableNativeFeedback
					onPress={() => this.editBook()}>
					<View style={styles.saveButton} >
						<Text style={styles.buttonText}>Save</Text>
					</View>
				</TouchableNativeFeedback>
			
				<SimpleChart />
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

export default BookDetail;