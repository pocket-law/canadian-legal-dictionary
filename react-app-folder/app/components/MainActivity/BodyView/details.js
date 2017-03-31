import React, {Component} from 'react';
import {AppRegistry, Image, Text, TextInput, View, StyleSheet, Alert, TouchableOpacity, Linking, AsyncStorage} from 'react-native';

export default class Details extends Component{
    constructor(props){
        super(props);
        this.state = {
            detailTerm: '',
            isBookmarked: false
        }
    }

    componentDidMount(){
        console.log("detail term" + this.props.detailTerm.term);
        this.checkBookmarked();
    }

    componentWillReceiveProps(nextProps) {
        // Remove searchterm if a '' is sent from MainActivity
        // Usually in response to a category selection by the user

        this.checkBookmarked();

        if (nextProps.detailTerm != null) {
            this.state.detailTerm = nextProps.detailTerm;
            this.checkBookmarked();
        }

        // TODO: kinda hacky, reseting bookmark visual if leaving details View
        // done this way because it looks better for the bookmark to become filled at a
        // delay rather than to become unfilled after a delay
        // there are definitely better ways  to accomplish better results here
        if (nextProps.isVisible != 'details') {
            this.state.isVisible = nextProps.isVisible;
            console.log("Falsing")
            this.setState({ isBookmarked: false });
            //this.state.isBookmarked = false;

        }
    }


    checkBookmarked() {
        // TODO: calling here and in handleBookmarking(), fix.
        detailID = this.state.detailTerm.uniqueID;

        // Check to see if already bookmarked, if so, unbookmarked, else, add bookmark
        AsyncStorage.getItem("bookmarks").then((bookmarksStr)=>{
            const returnObj = JSON.parse(bookmarksStr);

            console.log("bookmarksStr in details.js checkBookmarked(): " + bookmarksStr);

            // IF found in array, isBookmarked set to true
            var i = returnObj.indexOf(detailID);
            if(i != -1) {
            	this.setState({ isBookmarked: true });
            } else {
                this.setState({ isBookmarked: false });
            }
        });
    }

    handleBookmarking() {
        console.log("Details bookmark pressed!");

        // TODO: calling here and in checkBookmarked(), fix.
        detailID = this.state.detailTerm.uniqueID;

        // Check to see if already bookmarked, if so, unbookmarked, else, add bookmark
        // TODO: use isBookmarked state value instead of fresh call to async storage
        AsyncStorage.getItem("bookmarks").then((bookmarksStr)=>{
            const returnObj = JSON.parse(bookmarksStr);

            // Find and remove item from an array
            var i = returnObj.indexOf(detailID);
            if(i != -1) {
            	returnObj.splice(i, 1);
                this.setState({ isBookmarked: false });
                console.log("details bookmark removed");
            } else {
                returnObj.push(detailID);
                this.setState({ isBookmarked: true });
                console.log("details bookmark removed");
            }

            AsyncStorage.setItem("bookmarks", JSON.stringify(returnObj));

            console.log(" afterpress bookmarksStr from details getItem" + JSON.stringify(returnObj));
        });
    }

    handleSourcePress(url) {
        // Alert giving option to open url in a browser
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


    render(){

        sourceVar = false;
        relatedTermsVar = false;
        relatedTerms = ""


        try {
            test = this.state.detailTerm.source.name;
            sourceVar = true;
        } catch (error) {
            //console.log("source - ERROR")
        }

        try {
            relTerms = this.state.detailTerm.related_terms;
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
            //console.log(" related_terms - ERROR")
        }

        var detailTerm = this.props.detailTerm;

        return(
        <View style={styles.container}>
            <View style={styles.detail_container}>
                <View>
                    {this.state.detailTerm != null ?
                        <View style={styles.term_bar}>
                            <Text style={styles.term}>{this.state.detailTerm.term}</Text>
                                {this.state.isBookmarked == true ?
                                    <TouchableOpacity  onPress={this.handleBookmarking.bind(this)}>
                                        <Image style={styles.bookmark_button} source={require('./res/bookmark_check.png')}/>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity  onPress={this.handleBookmarking.bind(this)}>
                                        <Image style={styles.bookmark_button} source={require('./res/bookmark_blank.png')}/>
                                    </TouchableOpacity>
                                }

                        </View>
                    :
                        <Text/>
                    }
                    {relatedTermsVar &&
                        <View style={styles.seeAlsoView}>
                            <Text style={styles.rowTextSeeAlso}>see also: </Text>
                            <Text style={styles.seeAlsoName}>{relatedTerms}</Text>
                        </View>
                    }
                </View>
                <View>
                    {this.state.detailTerm != null ?
                        <Text style={styles.definition}>{this.state.detailTerm.definition}</Text>
                    :
                        <Text/>
                    }
                </View>
                <View>
                    {sourceVar &&
                        <View style={styles.sourceView}>
                            <Text style={styles.sourceLabel}>SOURCE</Text>
                            <TouchableOpacity onPress={()=>this.handleSourcePress(this.state.detailTerm.source.url)}>
                                <Text style={styles.sourceName}>{this.state.detailTerm.source.name}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    detail_container: {
        padding: 8,
        elevation: 2,
        backgroundColor: '#f4f4f4'
    },

    style_none: {

    },

    term_bar: {
        flexDirection: 'row'
    },

    term: {
        fontWeight: 'bold',
        color: '#46474c',
        fontSize: 22,
        marginBottom: 2,
        flex: 1
    },

    bookmark_button: {
        height: 40,
        width: 40,
        margin: 2
    },

    definition: {
        marginLeft: 4
    },

    sourceView: {
        flexDirection:'column',
        justifyContent:'flex-end'
    },

    sourceLabel: {
        fontWeight:'bold',
        marginTop: 4,
        textDecorationLine: 'underline',
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


AppRegistry.registerComponent('Details', () => Details);
