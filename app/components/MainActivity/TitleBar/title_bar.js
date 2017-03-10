import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, StyleSheet} from 'react-native';

import SearchBar from './SearchBar/search_bar';

export default class TitleBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            appname: "Canadian Legal Dictionary"
        }
    }


    render(){
        return(
        <View style={styles.title_bar_view}>
            <Text style={styles.apptitle}>{this.state.appname}</Text>
            <SearchBar/>
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
    title_bar_view: {
        backgroundColor:'#FF0000'
    }
});


AppRegistry.registerComponent('TitleBar', () => TitleBar);
