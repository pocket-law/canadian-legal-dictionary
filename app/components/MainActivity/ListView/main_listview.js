import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableHighlight} from 'react-native';

import jsonPath from './utilities/jsonPath';


const jsonString = '';

const jsonObj = null;

const mDictJson = require('./json/dict.json');

export default class MainListView extends Component{
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            termDataSource: ds,
            resultsArray: [],
            searchTerm:  '',

        };
    }


    componentWillReceiveProps(nextProps) {
        // Update state searchTerm when prop searchTerm updated
        if (nextProps.searchTerm != '') {
            console.log("MainListView new search: " + nextProps.searchTerm);
            this.setState({ searchTerm: nextProps.searchTerm });

            jsonObj = JSON.parse(jsonString);

            var resultsArray = [];

            // initialize for 6 blank search terms
            // TODO: note: search limited to 6 terms
            searchTermArray = ['','','','','','']
            searchTermSplit = nextProps.searchTerm.toUpperCase().split(" ");

            for (i = 0; i < searchTermSplit.length; i++) {
                searchTermArray[i] = searchTermSplit[i];
            }

            for (i = 0; i < jsonObj.terms.length; i++) {

                //check if search term is in term
                // TODO: outside function?
                if((jsonObj.terms[i].term).toUpperCase().includes(searchTermArray[0])
                    && (jsonObj.terms[i].term).toUpperCase().includes(searchTermArray[1])
                    && (jsonObj.terms[i].term).toUpperCase().includes(searchTermArray[2])
                    && (jsonObj.terms[i].term).toUpperCase().includes(searchTermArray[3])
                    && (jsonObj.terms[i].term).toUpperCase().includes(searchTermArray[4])
                    && (jsonObj.terms[i].term).toUpperCase().includes(searchTermArray[5])) {

                        console.log("listview search MATCH: " + nextProps.searchTerm + "\n==============================================" );

                        resultsArray.push(jsonObj.terms[i]);
                        console.log("jsonObj.terms[i].term: " + jsonObj.terms[i].term);

            }
        }

            this.state.resultsArray = resultsArray;

            if (resultsArray.length >= 1) {
                console.log("Results#: " + resultsArray.length);
                this.state.termDataSource = this.state.termDataSource.cloneWithRows(resultsArray);
            } else {
                alert("No Results!")
            }
        } else {
            // if search term = '', show all terms
            this.getInternalJson();
        }
    }

    componentDidMount(){
        this.getInternalJson();
    }

    getInternalJson(){
        this.setState({
            //termDataSource: this.state.termDataSource.cloneWithRows(response.terms)
            termDataSource: this.state.termDataSource.cloneWithRows(mDictJson.terms)
        });

        jsonString = JSON.stringify(mDictJson);

    }

    renderRow(term, sectionId, rowId, highlightRow){
        sourceVar = ""
        sourceName = ""
        try {
            sourceName = term.source.name
            sourceVar = "Source:"
        } catch (error) {
            console.log(term.term + " - ERROR")
        }
            return(
                <View style={styles.row}>
                    <View style={styles.rowContent}>
                        <Text style={styles.termText}>{term.term}</Text>
                        <Text style={styles.rowText}>{term.definition}</Text>
                        <View style={styles.sourceView}>
                            <Text style={styles.rowTextSource}>{sourceVar}</Text>
                            <Text style={styles.sourceName}>{sourceName}</Text>
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
        marginBottom: 236
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
        marginBottom: 3
    },

    rowContent: {
        flex: 1,
        flexDirection: 'column',
        padding: 10
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
        flexDirection:'column',
        justifyContent:'flex-end'
    },

    rowTextSource: {
        flexDirection:'row',
        flex: 1,
        fontWeight:'bold',
        textAlign: 'right',
        fontSize: 10
    },

    sourceName: {
        flex: 2,
        fontStyle: 'italic',
        fontWeight:'bold',
        color: '#2F8DFF',
        textAlign: 'right',
        fontSize: 10
    }
});

AppRegistry.registerComponent('MainListView', () => MainListView);
