import React from 'react';
import AppLoading from "./components/AppLoading";
import { View, Text, Dimensions, StatusBar } from 'react-native';
import { createAppContainer, createDrawerNavigator, DrawerItems, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {cacheAssets,cacheFonts} from "./helpers/AssetsCaching";

import Login from './views/login';
import Profile from './drawer/profile';
import Lists from './drawer/lists';

const WINDOW_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
  <View style={{ flex: 1, backgroundColor: '#43484d' }}>
    <View
      style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text style={{ fontSize: 24, color: "white" }}>TODO APP</Text>
    </View>
    <View style={{ marginLeft: 10 }}>
      <DrawerItems {...props} />
    </View>
  </View>
);

const AuthStack = createStackNavigator(
  {
    Login: {
      path: '/login',
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    initialRouteName: 'Login'
  }
)

const AppStack = createDrawerNavigator(
  {
    Profile: {
      path: '/profile',
      screen: Profile,
    },
    Lists: {
      path: '/lists',
      screen: Lists,
    }
  },
  {
    initialRouteName: 'Lists',
    contentOptions: {
      activeTintColor: '#548ff7',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: '#ffffff',
      inactiveBackgroundColor: 'transparent',
      labelStyle: {
        fontSize: 15,
        marginLeft: 0,
      },
    },
    drawerWidth: Math.min(WINDOW_WIDTH * 0.8, 300),
    contentComponent: CustomDrawerContentComponent,
  }
);

const MainRoot = createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
);

export default class AppContainer extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheAssets([
      require("../assets/images/bg_screen1.jpg"),
      require("../assets/images/bg_screen2.jpg"),
      require("../assets/images/bg_screen3.jpg"),
      require("../assets/images/bg_screen4.jpg"),
      require("../assets/images/user-cool.png"),
      require("../assets/images/user-hp.png"),
      require("../assets/images/user-student.png"),
      require("../assets/images/avatar1.jpg"),
    ]);

    const fontAssets = cacheFonts({
      "FontAwesome": require("@expo/vector-icons/fonts/FontAwesome.ttf"),
      "Ionicons": require("@expo/vector-icons/fonts/Ionicons.ttf"),
      "Entypo": require("@expo/vector-icons/fonts/Entypo.ttf"),
      "SimpleLineIcons": require("@expo/vector-icons/fonts/SimpleLineIcons.ttf"),
      "MaterialIcons": require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
      //TODO: What's wrong with MaterialCommunityIcons ???
      "MaterialCommunityIcons": require("@expo/vector-icons/fonts/MaterialCommunityIcons.ttf"),
    });

    await Promise.all([imageAssets, fontAssets]);
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }

    return <MainRoot />;
  }
}