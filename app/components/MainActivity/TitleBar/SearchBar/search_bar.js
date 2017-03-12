import React, {Component} from 'react';
import {AppRegistry, Image, TextInput, View, StyleSheet} from 'react-native';

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
            <Image style={styles.button} source={require('./menu_white.png')} />
            <TextInput
                style={styles.search_text}
                placeholder="Type here to translate!"
                onChangeText={(text) => this.setState({text})} />
            <Image style={styles.button} source={require('./search_white.png')} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    search_bar_view: {
        flexDirection:'row',
        margin: 4,
        backgroundColor: '#FFFFFF'
    },

    search_text: {
        padding:10,
        flex: 4,
        marginBottom:3,
        fontWeight:'bold',
        fontSize:22
    },

    button: {
        flex: 1,
        height: 44,
        width: 44,
        margin: 4,
    }
});


AppRegistry.registerComponent('SearchBar', () => SearchBar);
