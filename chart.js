import React, { Component } from 'react'; 
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Chart from 'react-native-chart';
import { Dimensions } from 'react-native';

import {readAllBooks} from './src/Storage';

import Database from "./firebase/database.js";

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: height/4,
        width: width,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    chart: {
        width: width-50,
        height: height/4-50,
    },
});

var sth = [];

export class SimpleChart extends Component {
	
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		this.getData();
	}
	
	getData() {
		sth = [];
		books = Database.getBooks();
		if(books !== null) {
			for (i = 0; i < books.length; i++) {
				value = [books[i].title, books[i].price];
				sth.push(value);
			}
		}
	}
	
	
    render() {
		const data = sth.slice();
        return (
            <View>
            <View style={styles.container}>
                <Chart
                    style={styles.chart}
                    data={data}
                    type="bar"
                    showDataPoint={true}
                    showGrid={false}
                 />
            </View>
           </View>
        );
    }
}