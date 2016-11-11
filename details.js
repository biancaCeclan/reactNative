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
   ToastAndroid
} from 'react-native';

class BookDetail extends Component {
	constructor(props){
		super(props);
		this.state = {title : props.title, author : props.author, year : props.year};
	}
  
	editBook() {
		var book = {title: this.state.title, author: this.state.author, pubYear: this.state.year}; 
		this.props.callback(book, this.props.position);
		this.props.navigator.pop();
	};

	render() {
		return (
			<View style={styles.container}>
				<TextInput 
					onChangeText={(title) => this.setState({title})}
					value={this.state.title} />
		 
				<TextInput 
					onChangeText={(author) => this.setState({author})}
					value={this.state.author}/>
			
				<TextInput
					onChangeText={(year) => this.setState({year})}
					value={this.state.year}/>
		 
				<TouchableNativeFeedback
					onPress={() => this.editBook()}>
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

export default BookDetail;