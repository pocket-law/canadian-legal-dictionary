import React, {Component} from 'react';
import {AppRegistry, Text, View, StyleSheet, TouchableHighlight} from 'react-native';

import MainListView from './ListView/main_listview';
import CatsListView from './ListView/cats_listview';
import TitleBar from './TitleBar/title_bar';

export default class MainActivity extends Component{
    constructor(){
        super();
        this.state = {
            isVisible: 'full-list',
            searchTerm: '',
            categorySet: ''
        };
    }

    handleListView(isVisible) {
        this.state.categorySet = ''

        if (isVisible == 'categories') {
            this.setState({isVisible: 'categories'});
        } else if (isVisible == 'full-list') {
            this.setState({isVisible: 'full-list'});
        }
    }

    handleSearch(searchTerm) {
        this.setState({searchTerm: searchTerm});
        this.setState({categorySet: ''});
        this.setState({isVisible: 'full-list'})
        console.log("MainActivity search: " + searchTerm);
    }

    handleCategoryChange(category) {
        this.setState({categorySet: category});
        this.setState({searchTerm: ''});
        this.setState({isVisible: 'full-list'})
        console.log("MainActivity category: " + category);
    }


    render(){
        return(
            <View style={styles.container}>
                <View style={styles.titleBar}>
                    <TitleBar
                        changeListView={this.handleListView.bind(this)}
                        isVisible={this.state.isVisible}
                        searchTerm={this.state.searchTerm}
                        searchFor={this.handleSearch.bind(this)} />
                </View>
                <View style={styles.listView}>
                    {this.state.isVisible == 'full-list' ?
                        <View>
                            <MainListView
                                categorySet={this.state.categorySet}
                                searchTerm={this.state.searchTerm} />
                        </View>
                    :
                        <View style={styles.noHeight}>
                            <MainListView
                                categorySet={this.state.categorySet}
                                searchTerm={this.state.searchTerm} />
                        </View>
                    }
                    {this.state.isVisible == 'categories'  ?
                        <View>
                            <CatsListView
                                changeCategory={this.handleCategoryChange.bind(this)} />
                        </View>
                    :
                    <View style={styles.noHeight}>
                        <CatsListView
                            changeCategory={this.handleCategoryChange.bind(this)} />
                    </View>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column'
    },

    noHeight: {
        height: 0
    },

    titleBar: {

    },

    listView: {

    }
});

AppRegistry.registerComponent('MainActivity', () => MainActivity);
