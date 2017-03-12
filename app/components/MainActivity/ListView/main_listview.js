import React, {Component} from 'react';
import {AppRegistry, Text, View, ListView, StyleSheet, TouchableHighlight} from 'react-native';

const terms = [
    {term: 'Pen Register', definition: 'An electronic surveillance device which attaches to a phone line and which registers every number dialed from a specific telephone.', source: 'http://canadianlawsite.ca'},
    {term: 'Pendente Lite', definition: 'Latin: during litigation. For example, if the validity of a will is challenged, a court might appoint an administrator pendente lite with limited powers to do such things as may be necessary to preserve the assets of the deceased until a hearing can be convened on the validity of the will.', source: 'http://canadianlawsite.ca'},
    {term: 'Pettifogger', definition: 'A petty or underhanded lawyer or an attorney who sustains a professional livelihood on disreputable or dishonorable business.', source: 'http://canadianlawsite.ca'},
    {term: 'Petty Offense', definition: 'A minor crime and for which the punishment is usually just a small fine or short term of imprisonment.', source: 'http://canadianlawsite.ca'},
    {term: 'Physical Custody', definition: 'A child custody decision which grants the right to organize and administer the day to day residential care of a child. This is usually combined with legal custody. ', source: 'http://canadianlawsite.ca'},
    {term: 'Plaintiff:', definition: 'A person who initiates a case in Court.  That person may also be referred to as the Claimant, Petitioner or Applicant.  The person who is being sued is generally called the Defendant or Respondent.', source: 'http://canadianlawsite.ca'}
]

export default class MainListView extends Component{
    constructor(){
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            termDataSource: ds.cloneWithRows(terms),
        };
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
        marginBottom: 245
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
