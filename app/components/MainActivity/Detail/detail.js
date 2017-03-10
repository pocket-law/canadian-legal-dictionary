import React, {Component} from 'react';
import {AppRegistry, Text, View, Button} from 'react-native';

export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: this.props.user.name,
            email: this.props.user.email
        }
    }

    backButton(){
        this.props.navigator.push({
            id:'list_page'
        });
    }

    render(){
        return(
        <View>
            <Text>{this.state.name}</Text>
            <Text>{this.state.email}</Text>
            <Button
                onPress={this.backButton.bind(this)}
                title="Go Back"
            />
        </View>
        );
    }
}

AppRegistry.registerComponent('Detail', () => Detail);
