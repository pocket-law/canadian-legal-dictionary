import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableOpacity, Linking, Alert, ToastAndroid} from 'react-native';

const jsonString = '';

const jsonObj = null;

const mDictJson = require('./json/dict.json');

// This variable is used to avoid searching again when clicking the hamburger menu after a search
const lastSearch = '';

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export default class MainListView extends Component{
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            termDataSource: ds,
            resultsArray: [],
            searchTerm:  '',
            categorySet: ''

        };
    }


    componentWillReceiveProps(nextProps) {

        // Update state searchTerm when prop searchTerm updated
        if ((nextProps.searchTerm != '') && (nextProps.searchTerm != lastSearch)) {

            lastSearch = nextProps.searchTerm;

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

                //TODO: custom toast solution to work on iOS as well
                if (resultsArray.length > 1) {
                    ToastAndroid.showWithGravity(resultsArray.length + " Results!", ToastAndroid.SHORT, ToastAndroid.CENTER);
                } else {
                    ToastAndroid.showWithGravity(resultsArray.length + " Result!", ToastAndroid.SHORT, ToastAndroid.CENTER);
                }

                this.setState({termDataSource: this.state.termDataSource.cloneWithRows(resultsArray)});
            } else {
                alert("No Results!")
                this.getInternalJson();
            }
        } else if (nextProps.searchTerm == '') {
            // if search term = '', show all terms
            this.getInternalJson();
        }

        if (nextProps.categorySet != '' && nextProps.categorySet != null) {

            // clear lastSearch as at this point the mainlistview will no longer reflect it
            lastSearch = '';

            console.log("MainListView categorySet: " + nextProps.categorySet);
            this.setState({ categorySet: nextProps.categorySet });

            jsonObj = JSON.parse(jsonString);

            var resultsArray = [];

            for (i = 0; i < jsonObj.terms.length; i++) {

                // check if category is in term tags ising .indexOf()
                if((''+jsonObj.terms[i].tags).includes(nextProps.categorySet)) {

                        console.log("listview category MATCH: " + nextProps.categorySet + "\n==============================================" );

                        resultsArray.push(jsonObj.terms[i]);
                        console.log("jsonObj.terms[i].term: " + jsonObj.terms[i].term);

                }
            }

            this.state.resultsArray = resultsArray;

            if (resultsArray.length >= 1) {
                console.log("Results# : " + resultsArray.length);
                this.setState({termDataSource: this.state.termDataSource.cloneWithRows(resultsArray)});
            }
        }

        // Scroll mainlistview to top after changing it's contents
        this.refs.mainListviewRef.getScrollResponder().scrollTo({x:0, y:0, animated: false});
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

    handleSourcePress(url) {
        // open url in a browser
        Alert.alert(
          'External URL',
          url,
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Link Pressed'), style: 'cancel'},
            {text: 'Open', onPress: () => this.openUrl(url)},
          ]
        )
    }

    openUrl(url) {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
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
                        {sourceVar &&
                            <View style={styles.sourceView}>
                                <Text style={styles.rowTextSource}>SOURCE</Text>
                                <TouchableOpacity onPress={()=>this.handleSourcePress(term.source.url)}>
                                    <Text style={styles.sourceName}>{term.source.name}</Text>
                                </TouchableOpacity>
                            </View>
                        }

                    </View>
                </View>
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
        // TODO: to get past the bottom bar on android, maybe theres a better way?
        // seems to be based on the height of the top bar
        marginBottom: 232
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
        color: '#46474c',
        flex: 1,
        fontSize: 18,
        fontWeight:'bold'
    },

    definitionText: {
        flex: 1,
        marginBottom: 4,
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

AppRegistry.registerComponent('MainListView', () => MainListView);
