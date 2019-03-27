import React from 'react';
import {createDrawerNavigator, createAppContainer} from 'react-navigation'
import HomeScreen from './components/HomeScreen';
import PlayerScreen from './components/PlayerScreen'
import LoginScreen from './components/LoginScreen'

import registerForPushNotificationsAsync from './utils/register_for_push_notifications';


const rootStack = createDrawerNavigator({
    Home: HomeScreen,
    Login: LoginScreen,
    Player: PlayerScreen
  },{
    initalRouteName: 'Home'
  }
) 


const AppContainer = createAppContainer(rootStack)


export default class App extends React.Component {
  constructor(){
    super()
    //Get the token associated this the device
    registerForPushNotificationsAsync().then((token)=>{
      console.log(token)
    })
  }

  render() {
    return (
      <AppContainer persistenceKey={"NavigationState"} />
    );
  }
}
