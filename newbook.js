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


class NewBook extends Component {
	constructor(props){
		super(props);
		this.state = {title : '', author : '', year: ''};
	}
  
	saveBook() {
		var book = {title: this.state.title, author: this.state.author, pubYear: this.state.year}; 
		this.props.callback(book);
		this.props.navigator.pop();
	};
  
	render() {
		return (
			<View style={styles.container}>
				<TextInput placeholder='Title' onChangeText={(title) => this.setState({title})} value={this.state.title} />
				<TextInput placeholder='Author' onChangeText={(author) => this.setState({author})} value={this.state.author} />
				<TextInput placeholder='Publication Year' onChangeText={(year) => this.setState({year})} value={this.state.year} />
		 
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