import React, {Component} from 'react';
import {AppRegistry, Text, View, Navigator} from 'react-native';

import Detail from './components/MainActivity/Detail/detail';
import MainActivity from './components/MainActivity/main_activity';


export default class Root extends Component{
  renderScene(route, navigator){
    switch(route.id){
      case 'main_activity':
        return (<MainActivity navigator={navigator} title="main_activity" />)
      case 'detail':
        return (<Detail user={route.user} navigator={navigator} title="detail" />)
    }
  }

  render(){
    return(
      <Navigator
        initialRoute={{id: 'main_activity'}}
        renderScene={this.renderScene}
        configureScreen={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
      />
    );
  }
}

AppRegistry.registerComponent('Root', () => Root);
