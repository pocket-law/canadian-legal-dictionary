import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableHighlight} from 'react-native';

import jsonPath from './utilities/jsonPath';


const jsonString = '';

const jsonObj = null;



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
                this.state.termDataSource = this.state.termDataSource;
                alert("No Results!")
            }
        } else {
            // if search term = '', show all terms
            this.fetchTerms();
        }
    }

    componentDidMount(){
        this.fetchTerms();
    }

    fetchTerms(){
        fetch('https://raw.githubusercontent.com/pocket-law/canadian-legal-dictionary/master/app/components/MainActivity/ListView/json/pocketlaw_dictionary.json')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    termDataSource: this.state.termDataSource.cloneWithRows(response.terms)
                });
                jsonString = JSON.stringify(response);
            });
    }

    renderRow(term, sectionId, rowId, highlightRow){
            return(
                <View style={styles.row}>
                    <View>
                        <Text style={styles.termText}>{term.term}</Text>
                        <Text style={styles.rowText}>{term.definition}</Text>
                        <View style={styles.sourceView}>
                            <Text style={styles.rowTextSource}>Source:</Text>
                        <Text style={styles.sourceLink}>{term.source.name}</Text>
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
