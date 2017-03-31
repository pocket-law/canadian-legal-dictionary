import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableOpacity, ToastAndroid, AsyncStorage} from 'react-native';

const jsonString = '';

const jsonObj = null;

const mDictJson = require('./res/dict.json');

// This variable is used to avoid searching again when clicking the hamburger menu after a search
const lastSearch = '';

var mBookmarks = [];

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
            bkmkDataSource: ds,
            resultsArray: [],
            searchTerm:  '',
            categorySet: ''
        };
    }


    componentWillReceiveProps(nextProps) {
        // TODO: causes an update after user sees listview, can be done better
        // Update bookmarks
        if (nextProps.isVisible == 'bookmarks') {
            this.getBookmarks();
        }

    }

    componentDidMount(){
        this.getBookmarks();
    }

    getBookmarks(){
        AsyncStorage.getItem("bookmarks").then((bookmarksStr)=>{
            mBookmarks = JSON.parse(bookmarksStr);
            //console.log("details bookmarksStr" + bookmarksStr)
            this.findBookmarks();
        });
    }

    findBookmarks() {
        var resultsArray = [];

        for (i = 0; i < mDictJson.terms.length; i++) {
            // check if term is bookmarked
            if(mBookmarks.includes(mDictJson.terms[i].uniqueID)) {

                resultsArray.push(mDictJson.terms[i]);
                //console.log(" bookmark jsonObj.terms[i].term: " + mDictJson.terms[i].term);
            }
        }

        this.state.resultsArray = resultsArray;

        if (resultsArray.length >= 1) {
            this.setState({bkmkDataSource: this.state.bkmkDataSource.cloneWithRows(resultsArray)});
        } else {
            console.log("No Bookmarks!")
            this.setState({bkmkDataSource: this.state.bkmkDataSource.cloneWithRows(resultsArray)});
        }
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


        return(
            <TouchableOpacity onPress={()=>this.handleDetailPress(term)}>
                <View style={styles.row}>
                    <View style={styles.rowContent}>
                        <Text style={styles.termText}>{term.term}</Text>
                        <Text style={styles.definitionText}>{term.definition}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <ListView
                enableEmptySections={true}
                style={styles.listView}
                ref='mainListviewRef'
                dataSource={this.state.bkmkDataSource}
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
        backgroundColor: '#97b5e5',
        elevation: 2,
        margin: 4
    },

    rowContent: {
        flex: 1,
        flexDirection: 'column',
        padding: 10
    },

    termText: {
        color: '#203556',
        flex: 1,
        fontSize: 18,
        fontWeight:'bold'
    },

    definitionText: {
        flex: 1,
        marginBottom: 4,
        marginLeft: 8,
        marginTop: 4,
        color: '#363e49'
    }

});

AppRegistry.registerComponent('BkmkListView', () => BkmkListView);
