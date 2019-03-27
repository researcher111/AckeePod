import React from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import { Constants, Notifications } from 'expo'
import Featured from './Featured'
import Header from './Header'
import PodScrollView from './PodScrollView'
import { Analytics, PageHit } from 'expo-analytics';

const analytics = new Analytics('UA-32594877-1');

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
  }

    componentDidMount(){
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
        analytics.hit(new PageHit('Home'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
    }

    _handleNotification = (notification) => {
      this.setState({notification: notification})
      console.log("Got Notification")

      Alert.alert(
        'Alert Title',
        'My Alert Msg',
      )
    };

  render() {
    return (
        <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        <TouchableOpacity
          onPress={()=>{this.props.navigation.navigate('Player', 
            {pod: "1"}
          )}}
        >
           <Featured/>
        </TouchableOpacity>
        <PodScrollView />
      </View>
    )
  }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection:'column',
            backgroundColor: "#000D0C",
            paddingTop: Constants.statusBarHeight,

        }
    }
)

