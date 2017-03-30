import React, {Component} from 'react';
import {AppRegistry, Image, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    handleUIback() {

    }

    handleBookmarks() {
        console.log("bookmarks pressed...");

        var isVisible = this.props.isVisible;

        console.log('was visible - ' + isVisible);

        if (isVisible == 'full-list') {
            isVisible = 'bookmarks';
        } else if (isVisible == 'categories') {
            isVisible = 'bookmarks';
        } else if (isVisible == 'details') {
            isVisible = 'bookmarks';
        } else if (isVisible == 'bookmarks') {
            isVisible = 'full-list';
        } else {
            isVisible = 'full-list'
        }
        console.log('now visible - ' + isVisible);

       // Providing `isVisible` variable to changeListView callback.
        this.props.changeListView(isVisible);
    }


    render(){
        return(
        <View style={styles.container}>
            <View style={styles.fill}/>
            <TouchableOpacity  onPress={this.handleBookmarks.bind(this)}>
                <Image style={styles.button} source={require('./res/bookmarks_white.png')}/>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#3B5198',
        elevation: 6
    },

    fill: {
        flex: 1
    },

    button: {
        height: 40,
        width: 40,
        margin: 4,
    }


});


AppRegistry.registerComponent('Footer', () => Footer);
