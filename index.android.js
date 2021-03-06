import React, {Component} from 'react';
import {
   Navigator, 
   StatusBar, 
   TouchableHighlight,
   AppRegistry, 
   StyleSheet, 
   Text, 
   View,
   ToastAndroid
} from 'react-native';

import * as firebase from "firebase";

import BookList from './list.js';
import BookDetail from './details.js';
import NewBook from './newbook.js';

import Login from "./login.js";

import Firebase from "./firebase/firebase.js";
import Database from "./firebase/database.js";

const routes = [
  {
	title: 'BookList',
    index: 0
  }, {
    title: 'Book Detail',
    index: 1
  }, {
	title: 'New Book',
	index: 2
  },{
	title: 'Login',
	index: 3
  }
]

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  userLoaded: false,
		  initialView: null,
		  routeIndex: 0,
		  uid: ""
		};
		this.getInitialView = this.getInitialView.bind(this);

		var firebase = Firebase.initialise();
		var firebaseRef = firebase.database().ref();
		Database.initializeFirebaseRef(firebaseRef);
		
		this.getInitialView();
	}
	
	getInitialView() {
		firebase.auth().onAuthStateChanged((user) => {
			var initialView;
			var routeIndex;
			var uid;
			
			if(user === null) {
				initialView = "Login";
				routeIndex = 3;
				uid = "";
			} else {
				initialView = "BookList";
				routeIndex = 0;
				uid = user.uid;
			}

		  this.setState({
			userLoaded: true,
			initialView: initialView,
			routeIndex: routeIndex,
			uid: uid
		  })
		  
		  Database.initializeUid(uid);
		});		
	}
	
	async logOut(navigator) {
		try {
			await firebase.auth().signOut();
			// Navigate to login view
			navigator.push({index: 3})
		} catch (error) {
			ToastAndroid.show("Could not log out", ToastAndroid.SHORT);
		}
	}
	
	render() {
	if (this.state.userLoaded) {
		return (
		<View style={styles.container}>
        
			<Navigator
				initialRoute={routes[this.state.routeIndex]}
				initialRouteStack={routes}
				renderScene={
					(route, navigator) => {
						switch (route.index) {
							case 0: return (<BookList navigator={navigator} route={routes[route.index]} {...route.passProps}></BookList>);
							case 1: return (<BookDetail navigator={navigator} route={routes[route.index]} {...route.passProps}></BookDetail>);
							case 2: return (<NewBook navigator={navigator} route={routes[route.index]} {...route.passProps}></NewBook>);
							case 3: return (<Login navigator={navigator} route={routes[route.index]} {...route.passProps}></Login>);
						}
					}
				}
				configureScene={
					(route, routeStack) =>
						Navigator.SceneConfigs.FloatFromBottom
				}
				navigationBar={
					<Navigator.NavigationBar
						routeMapper={{
							LeftButton: (route, navigator, index, navState) => {
								if (route.index == 0){
									return (
										<TouchableHighlight onPress={()=>this.logOut(navigator)}>
											<Text style={styles.navigationBarText}>Log out</Text>
										</TouchableHighlight>
									)
								}
								if (route.index == 3){
									return null;
								}
								return (
									<TouchableHighlight onPress={()=>navigator.pop()}>
										<Text style={styles.navigationBarText}>Back</Text>
									</TouchableHighlight>
								)
							},
							RightButton: (route, navigator, index, navState) => { return null; },
							Title: (route, navigator, index, navState) =>
								{ return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title}</Text>);},
						}}
						style={styles.navigationBar}
					/>
				}
			/>
		</View>
		);
	} else {
		return null;
	}
	
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	navigationBar:{
		backgroundColor: 'lightblue',
	},
	navigationBarText:{
		padding: 10,
		fontSize: 15
	},
	titleText:{
		fontSize: 20,
		paddingTop:5
	}
});

AppRegistry.registerComponent('BookManagement', () => App);