import React, {Component} from 'react';
import {AppRegistry, Image, Text, TextInput, View, StyleSheet, ScrollView, Alert, TouchableOpacity, Linking, AsyncStorage} from 'react-native';


export default class Details extends Component{
    constructor(props){
        super(props);
        this.state = {
            detailTerm: '',
            isBookmarked: false
        }
    }

    componentDidMount(){
        this.checkBookmarked();
    }

    componentWillReceiveProps(nextProps) {
        // Update state and recheck bookmark on recieve props

        if (nextProps.detailTerm) {
            this.state.isBookmarked = false;
            this.state.detailTerm = nextProps.detailTerm;
            this.checkBookmarked();
        }

        if (nextProps.isVisible) {
            this.state.isBookmarked = false;
            this.state.isVisible = nextProps.isVisible;
            this.checkBookmarked();
        }
    }


    checkBookmarked() {
        // TODO: calling here and in handleBookmarking(), fix.
        var detailID = this.state.detailTerm.uniqueID;

        // Check to see if already bookmarked, if so, unbookmarked, else, add bookmark
        AsyncStorage.getItem("bookmarks").then((bookmarksStr)=>{
            const returnObj = JSON.parse(bookmarksStr);

            // IF found in array, isBookmarked set to true
            try {
                var i = returnObj.indexOf(detailID);
                if (i != -1) {
                    this.state.isBookmarked = true;
                    this.setState({ isBookmarked: true });
                } else {
                    this.state.isBookmarked = false;
                    this.setState({ isBookmarked: false });
                }
            } catch (err) {
                //console.log('null in details:', err);
            }
        });
    }

    handleBookmarking() {
        console.log("Details bookmark pressed!");

        // TODO: calling here and in checkBookmarked(), fix.
        var detailID = this.state.detailTerm.uniqueID;

        // Check to see if already bookmarked, if so, unbookmarked, else, add bookmark
        // TODO: use isBookmarked state value instead of fresh call to async storage
        AsyncStorage.getItem("bookmarks").then((bookmarksStr)=>{
            const returnObj = JSON.parse(bookmarksStr);

            // Find and remove item from an array
            try {
                var i = returnObj.indexOf(detailID);

                if(i != -1) {
                	returnObj.splice(i, 1);
                    this.setState({ isBookmarked: false });
                    console.log("details bookmark removed " + detailID);
                } else {
                    returnObj.push(detailID);
                    this.setState({ isBookmarked: true });
                    console.log("details bookmark added  " + detailID);
                }

                AsyncStorage.setItem("bookmarks", JSON.stringify(returnObj));

            } catch (err) {
                console.log('error handling bookmarking: ', err);

                // This error is guarenteed is a bookmarks key has not yet been created in AsyncStorage,
                // Therefore, create blank and recall handleBookmarking if error hit
                // TODO: think this through, might cause infinite calls to handleBookmarking in some case...
                AsyncStorage.setItem("bookmarks", '[]');
                this.handleBookmarking();
            }
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


        // Check for source
        try {
            test = this.state.detailTerm.source.name;
            sourceVar = true;
        } catch (error) {
            //console.log("source - ERROR")
        }

        //Check for related terms
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
            <ScrollView style={styles.detail_container}>
                <View>
                    {this.state.detailTerm != null ?
                        <View style={styles.term_bar}>
                            <View style={styles.term_see_view}>
                                <Text style={styles.term}>{this.state.detailTerm.term}</Text>
                                {relatedTermsVar &&
                                    <View style={styles.seeAlsoView}>
                                        <Text style={styles.rowTextSeeAlso}>see also: </Text>
                                        <Text style={styles.seeAlsoName}>{relatedTerms}</Text>
                                    </View>
                                }
                            </View>
                                {this.state.isBookmarked ?
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
            </ScrollView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    detail_container: {
        padding: 0,
        elevation: 2,
        backgroundColor: '#f4f4f4'
    },

    term_see_view: {
        flex: 1
    },

    style_none: {

    },

    term_bar: {
        flexDirection: 'row'
    },

    term: {
        paddingTop: 8,
        paddingLeft: 8,
        fontWeight: 'bold',
        color: '#46474c',
        fontSize: 22,
        marginBottom: 2,
    },

    bookmark_button: {
        height: 40,
        width: 40,
        margin: 1
    },

    definition: {
        paddingLeft: 12
    },

    sourceView: {
        marginRight: 8,
        marginBottom: 16,
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
        marginRight: 32,
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
