import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableHighlight} from 'react-native';

import MainListView from './ListView/list_view';
import TitleBar from './TitleBar/title_bar';

export default class MainActivity extends Component{

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <TitleBar/>
                </View>
                <View style={styles.listView}>
                    <MainListView/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column'
    },
    titleBar: {

    },
    listView: {

    }
});

AppRegistry.registerComponent('MainActivity', () => MainActivity);
