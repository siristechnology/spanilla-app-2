import React from 'react';
import MainScreen from '../../screens/MainScreen/index';
// import AboutUs from '../../screens/AboutUs/index';
// import Bookmarks from '../../screens/Bookmarks/index';
// import Categories from '../../screens/Categories/index';
// import ContactUs from '../../screens/ContactUs/index';
// import FAQ from '../../screens/FAQ/index';
import Home from '../../screens/Home/index';
// import More from '../../screens/More/index';
// import ShareApp from '../../screens/ShareApp/index';
// import Details from '../../screens/Details/index';
// import PostList from '../../screens/PostList/index';
// import SearchCategoriesList from '../../screens/SearchCtegoriesList/index';
// import { StackNavigator } from "react-navigation";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
