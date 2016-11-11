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
  Linking
} from 'react-native';

var BOOKS_DATA = [
  {title: 'Title1', author: 'Author1', pubYear: '2001'},
  {title: 'Title2', author: 'Author2', pubYear: '2002'},
  {title: 'Title3', author: 'Author3', pubYear: '2003'},
  {title: 'Title4', author: 'Author4', pubYear: '2004'},
  {title: 'Title5', author: 'Author5', pubYear: '2005'},
  {title: 'Title6', author: 'Author6', pubYear: '2006'},
  {title: 'Title7', author: 'Author7', pubYear: '2007'},
  {title: 'Title8', author: 'Author8', pubYear: '2008'},
 ];

class BookList extends Component {
	constructor(props) {
		super(props);
		this.callbackFunctionNew = this.callbackFunctionNew	.bind(this);
		this.callbackFunction = this.callbackFunction.bind(this);
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
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(BOOKS_DATA),
			loaded: true,
        });
	}
	callbackFunction(args, index) {
		var newData = BOOKS_DATA.slice();
		newData[index] = args;
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(newData),
        });
		BOOKS_DATA = newData.slice();
		ToastAndroid.show('The Book was modified', ToastAndroid.SHORT);
	};
	
	callbackFunctionNew(args) {
		BOOKS_DATA.push(args);
		
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(BOOKS_DATA),
        });
		
		ToastAndroid.show('A book was inserted', ToastAndroid.SHORT);
	
		var body = 'The book : Book{title =' + args['title'] + ', author=' + args['author'] + ', publication year=' + args['pubYear'];
		var firstMailURL = 'mailto:bianca_ceclan@yahoo.com?subject=Book Insertion&body='.concat(body);
		var finalBoby = '} has been inserted.'
		var mailURL = firstMailURL.concat(finalBoby);
		Linking.openURL(mailURL).catch(err => console.error('An error occurred', err));
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
							position: BOOKS_DATA.indexOf(data),
							callback: this.callbackFunction,
						},
						}
					)}>
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
