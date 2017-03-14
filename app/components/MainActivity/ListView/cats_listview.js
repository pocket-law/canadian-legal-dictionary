import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableHighlight} from 'react-native';


export default class CatsListView extends Component{
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            catsDataSource: ds,
        };
    }


    componentDidMount(){
        this.fetchCategories();
    }

    fetchCategories(){
        fetch('https://raw.githubusercontent.com/pocket-law/canadian-legal-dictionary/master/json/_categories.json')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    catsDataSource: this.state.catsDataSource.cloneWithRows(response)
                });
            });
    }

    renderRow(category, sectionId, rowId, highlightRow){
            return(
                <View style={styles.row}>
                    <View>
                        <Text style={styles.categoryText}>{category.term}</Text>
                    </View>
                </View>
            )
        }

    render(){
        return(
            <ListView
                style={styles.listView}
                dataSource={this.state.catsDataSource}
                renderRow={this.renderRow.bind(this)} />
        );
    }
}

const styles = StyleSheet.create({
    listView: {
        // TODO: to get past the bottom bar on android, maybe theres a better way?
        // seems to be based on the height of the top bar
        marginBottom: 238
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#2e3f76',
        marginBottom: 3
    },

    categoryText: {
        flex: 1,
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight:'bold'
    }

});

AppRegistry.registerComponent('CatsListView', () => CatsListView);
