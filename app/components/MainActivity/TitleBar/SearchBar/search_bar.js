import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, StyleSheet} from 'react-native';

export default class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            appname: "Canadian Legal Dictionary"
        }
    }


    render(){
        return(
        <View style={styles.search_bar_view}>
            <Text style={styles.apptitle}>Search...</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    apptitle: {
        padding:10,
        marginBottom:3,
        fontWeight:'bold',
        fontSize:22
    },
    search_bar_view: {
        margin: 4,
        backgroundColor: '#FFFFFF'
    }
});


AppRegistry.registerComponent('SearchBar', () => SearchBar);
