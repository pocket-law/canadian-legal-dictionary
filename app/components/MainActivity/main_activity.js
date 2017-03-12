import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableHighlight} from 'react-native';

import MainListView from './ListView/main_listview';
import CatsListView from './ListView/cats_listview';
import TitleBar from './TitleBar/title_bar';

export default class MainActivity extends Component{
    constructor(){
        super();
        this.state = {
            mainListView: true,
            catsListView: false
        };
    }

    handleListView(isVisible) {

        console.log(isVisible);

        if (isVisible == 'categories') {
            this.setState({catsListView: true});
            this.setState({mainListView: false});
        } else if (isVisible == 'full-list') {
            this.setState({mainListView: true});
            this.setState({catsListView: false});
        }

    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <TitleBar changeListView={this.handleListView.bind(this)} />
                </View>
                <View style={styles.listView}>
                    {this.state.mainListView ? <MainListView/> : null}
                    {this.state.catsListView ? <CatsListView/> : null}
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
