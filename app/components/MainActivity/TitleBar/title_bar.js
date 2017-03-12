import React, {Component} from 'react';
import {AppRegistry, Image, Text, View, Button, StyleSheet} from 'react-native';

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
            <View style={styles.rowscape}>
                <Image style={styles.logo} source={require('./blue_leaf.png')} />
                <Text style={styles.apptitle}>{this.state.appname}</Text>
            </View>
            <SearchBar/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    title_bar_view: {
        flexDirection:'column',
        backgroundColor:'#FF0000'
    },

    rowscape: {
        flexDirection:'row',
        backgroundColor:'#FF0000'
    },

    logo: {
        height: 44,
        width: 44,
        marginLeft: 4,
        marginTop: 8

    },

    apptitle: {
        flex: 4,
        padding: 10,
        marginBottom: 3,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 26
    }


});


AppRegistry.registerComponent('TitleBar', () => TitleBar);
