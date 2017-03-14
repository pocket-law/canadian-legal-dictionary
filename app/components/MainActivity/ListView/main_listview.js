import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableHighlight} from 'react-native';

export default class MainListView extends Component{
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            termDataSource: ds,
        };
    }

    componentDidMount(){
        this.fetchTerms();
    }

    fetchTerms(){
        fetch('https://raw.githubusercontent.com/pocket-law/canadian-legal-dictionary/master/json/pocketlaw_dictionary.json')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    termDataSource: this.state.termDataSource.cloneWithRows(response.terms)
                });
            });
    }

    renderRow(term, sectionId, rowId, highlightRow){
            return(
                <View style={styles.row}>
                    <View>
                        <Text style={styles.termText}>{term.term}</Text>
                        <Text style={styles.rowText}>{term.definition}</Text>
                        <View style={styles.sourceView}>
                            <Text style={styles.rowTextSource}>source:</Text>
                            <Text style={styles.sourceLink}>{term.source}</Text>
                        </View>

                    </View>
                </View>
            )
        }

    render(){
        return(
            <ListView
                style={styles.listView}
                dataSource={this.state.termDataSource}
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
        backgroundColor: '#f4f4f4',
        marginBottom: 3
    },

    termText: {
        flex: 1,
        fontSize: 16,
        fontWeight:'bold'
    },

    rowText: {
        flex: 1,
        marginLeft: 8,
        marginTop: 4
    },

    sourceView: {
        flexDirection:'row',
        justifyContent:'flex-end'
    },

    rowTextSource: {
        flexDirection:'row',
        flex: 2,
        fontWeight:'bold',
        textAlign: 'right',
        fontSize: 10
    },

    sourceLink: {
        flex: 1,
        fontStyle: 'italic',
        fontWeight:'bold',
        color: '#2F8DFF',
        textAlign: 'right',
        fontSize: 10
    }
});

AppRegistry.registerComponent('MainListView', () => MainListView);