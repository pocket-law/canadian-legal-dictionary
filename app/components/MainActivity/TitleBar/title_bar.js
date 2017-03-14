import React, {Component} from 'react';
import {AppRegistry, Image, Text, TextInput, View, Button, StyleSheet,TouchableOpacity} from 'react-native';

export default class TitleBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            appname: 'Canadian Legal Dictionary',
            searchTerm: '',
            isVisible: 'full-list' // categories, full-list, sub-list
        }
    }

    handleHamburger() {
        var isVisible = this.state.isVisible;
        console.log('was visible - ' + isVisible);

        if (isVisible == 'full-list') {
            this.setState({ isVisible: 'categories' });
            isVisible = 'categories';
        } else if (isVisible == 'categories') {
            this.setState({ isVisible: 'full-list' });
            isVisible = 'full-list';
        }
        console.log('now visible - ' + isVisible);

       // Providing `isVisible` variable to changeListView callback.
        this.props.changeListView(isVisible);
    }

    handleSearch() {
        var searchTerm = this.state.searchTerm;

        this.props.searchFor(searchTerm);
    }

    render(){
        return(
        <View style={styles.title_bar_view}>

            {/* }AppTitle */}
            <View style={styles.titleBar}>
                <Image style={styles.leaf} source={require('./leaf.png')} />
                <Text style={styles.apptitle}>{this.state.appname}</Text>
            </View>

            {/* }SearchBar */}
            <View style={styles.search_bar_view}>
                <TouchableOpacity  onPress={this.handleHamburger.bind(this)}>
                    <Image style={styles.button} source={require('./menu_white.png')}/>
                </TouchableOpacity>
                <TextInput
                    style={styles.search_text}
                    returnKeyType='search'
                    placeholder="Search..."
                    onChangeText={(text) => this.setState({text})}
                    onChangeText={(text) => this.setState({ searchTerm: text })}
                    onSubmitEditing={this.handleSearch.bind(this)}/>
                <TouchableOpacity  onPress={this.handleSearch.bind(this)}>
                    <Image style={styles.button} source={require('./search_white.png')} />
                </TouchableOpacity>
            </View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    title_bar_view: {
        flexDirection:'column',
        backgroundColor:'#3B5198'
    },

    titleBar: {
        flexDirection:'row',
        backgroundColor:'#3B5198'
    },

    leaf: {
        height: 44,
        width: 44,
        marginLeft: 4,
        marginTop: 8

    },

    apptitle: {
        flex: 4,
        padding: 10,
        marginBottom: 3,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 26
    },

    search_bar_view: {
        flexDirection:'row',
        margin: 4,
        backgroundColor: '#FFFFFF'
    },

    search_text: {
        padding:10,
        flex: 4,
        fontStyle: 'italic',
        marginBottom:3,
        fontWeight:'bold',
        fontSize:22
    },

    button: {
        flex: 1,
        height: 44,
        width: 44,
        margin: 4,
    }


});


AppRegistry.registerComponent('TitleBar', () => TitleBar);
