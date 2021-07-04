import 'react-native-gesture-handler';
import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/Components/Navigation/index';
// import {AsyncStorage, Alert} from 'react-native';
// import firebase from 'react-native-firebase';
import {ApolloProvider} from '@apollo/client';
import GraphqlClient from './src/graphql/graphql-client';
import {NativeBaseProvider, Box} from 'native-base';

export default class App extends Component {
  async componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <NativeBaseProvider>
        <ApolloProvider client={GraphqlClient}>
          <Navigation />
        </ApolloProvider>
      </NativeBaseProvider>
    );
  }
}
