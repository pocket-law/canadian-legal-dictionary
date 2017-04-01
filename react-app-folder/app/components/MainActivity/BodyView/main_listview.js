import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';

const jsonString = '';

const jsonObj = null;

const mDictJson = require('./res/dict.json');

// This variable is used to avoid searching again when clicking the hamburger menu after a search
const lastSearch = '';

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export default class MainListView extends Component{
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

        // when cat is changed, space is passed to search term to tell listview to reset scroll
        if (nextProps.searchTerm == ' ') {
            this.refs.mainListviewRef.getScrollResponder().scrollTo({x:0, y:0, animated: false});
        }
        // Update state searchTerm when prop searchTerm updated
        if ((nextProps.searchTerm != ' ') && (nextProps.searchTerm != '') && (nextProps.searchTerm != lastSearch)) {

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

                        resultsArray.push(jsonObj.terms[i]);
                        console.log("search match: " + jsonObj.terms[i].term);

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

            // Scroll mainlistview to top after changing it's contents only if searchTerm is new
            if (nextProps.searchTerm != lastSearch) {
                this.refs.mainListviewRef.getScrollResponder().scrollTo({x:0, y:0, animated: false});
            }
            // set last search so above getScrollResponder not called if simply returning to listview
            lastSearch = nextProps.searchTerm;

        } else if (nextProps.searchTerm == '') {
            // if search term = '', show all terms
            this.getInternalJson();

            // Scroll mainlistview to top after changing it's contents if searchTerm is newly blanked
            if (nextProps.searchTerm != lastSearch) {
                this.refs.mainListviewRef.getScrollResponder().scrollTo({x:0, y:0, animated: false});
            }
            // set last search so above getScrollResponder not called if simply returning to listview
            lastSearch = '';
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
        backgroundColor: '#f4f4f4',
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
