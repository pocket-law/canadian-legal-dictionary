import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';

const jsonString = '';

const jsonObj = null;

const mDictJson = require('./res/dict.json');

// This variable is used to avoid searching again when clicking the hamburger menu after a search
const lastSearch = '';

// TODO: sort options
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export default class BkmkListView extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            termDataSource: ds,
            resultsArray: [],
            searchTerm:  '',
            categorySet: ''

        };
    }


    componentWillReceiveProps(nextProps) {

    }

    componentDidMount(){
        this.getInternalJson();
    }

    getInternalJson(){
        this.setState({
            termDataSource: this.state.termDataSource.cloneWithRows(sortByKey(mDictJson.terms, 'term'))
        });

        jsonString = JSON.stringify(mDictJson);
    }

    // Open Details view for term on row click
    handleDetailPress(term) {
         this.props.showDetails(term);
    }

    renderRow(term, sectionId, rowId, highlightRow){
        sourceVar = false;
        relatedTermsVar = false;
        relatedTerms = ""


        try {
            test = term.source.name;
            sourceVar = true;
        } catch (error) {
            //console.log(term.term + "source - ERROR")
        }

        try {
            relTerms = term.related_terms;
            if (relTerms.length > 0) {
                for (i = 0; i < relTerms.length; i++) {
                    if (i == 0) {
                        newTerms = relTerms[i];
                    } else {
                        newTerms = relatedTerms + ", " +relTerms[i];
                    }
                    relatedTerms = newTerms;
                    relatedTermsVar = true;
                }
            }
        } catch (error) {
            //console.log(term.term + " related_terms - ERROR")
        }
            return(
                <TouchableOpacity onPress={()=>this.handleDetailPress(term)}>
                    <View style={styles.row}>
                        <View style={styles.rowContent}>
                            <Text style={styles.termText}>{term.term}</Text>
                            {relatedTermsVar &&
                                <View style={styles.seeAlsoView}>
                                    <Text style={styles.rowTextSeeAlso}>see also: </Text>
                                    <Text style={styles.seeAlsoName}>{relatedTerms}</Text>
                                </View>
                            }
                            <Text style={styles.definitionText}>{term.definition}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

    render(){
        return(
            <ListView
                style={styles.listView}
                ref='mainListviewRef'
                dataSource={this.state.termDataSource}
                renderRow={this.renderRow.bind(this)} />
        );
    }
}


const styles = StyleSheet.create({
    listView: {

    },

    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#0000FF',
        elevation: 2,
        margin: 4
    },

    rowContent: {
        flex: 1,
        flexDirection: 'column',
        padding: 10
    },

    termText: {
        color: '#46474c',
        flex: 1,
        fontSize: 18,
        fontWeight:'bold'
    },

    definitionText: {
        flex: 1,
        marginBottom: 4,
        marginLeft: 8,
        marginTop: 4
    },

    sourceView: {
        flexDirection:'column',
        justifyContent:'flex-end'
    },

    rowTextSource: {
        fontWeight:'bold',
        textAlign: 'right',
        color: '#7d8693',
        fontSize: 10
    },

    sourceName: {
        fontStyle: 'italic',
        fontWeight:'bold',
        color: '#5474a8',
        textAlign: 'right',
        fontSize: 10
    },

    seeAlsoView: {
        marginLeft: 16,
        flex: 1,
        flexDirection:'row'
    },

    rowTextSeeAlso: {
        color: '#5474a8',
        fontWeight: 'bold',
        fontSize: 10
    },

    seeAlsoName: {
        fontStyle: 'italic',
        fontWeight:'bold',
        color: '#7d8693',
        fontSize: 10
    }

});

AppRegistry.registerComponent('BkmkListView', () => BkmkListView);
