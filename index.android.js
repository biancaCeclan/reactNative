import React, {Component} from 'react';
import {
   Navigator, 
   StatusBar, 
   TouchableHighlight,
   AppRegistry, 
   StyleSheet, 
   Text, 
   View
} from 'react-native';

import BookList from './list.js';
import BookDetail from './details.js';
import NewBook from './newbook.js';

const routes = [
  {
	title: 'Books',
    index: 0
  }, {
    title: 'Book Detail',
    index: 1
  }, {
	title: 'New Book',
	index: 2
  }
]

class App extends Component {
	render() {
		return (
		<View style={styles.container}>
        
			<Navigator
				initialRoute={routes[0]}
				initialRouteStack={routes}
				renderScene={
					(route, navigator) => {
						switch (route.index) {
							case 0: return (<BookList navigator={navigator} route={routes[route.index]} {...route.passProps}></BookList>);
							case 1: return (<BookDetail navigator={navigator} route={routes[route.index]} {...route.passProps}></BookDetail>);
							case 2: return (<NewBook navigator={navigator} route={routes[route.index]} {...route.passProps}></NewBook>);
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