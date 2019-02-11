import React from 'react';
import {View, StyleSheet} from 'react-native'
import { Constants } from 'expo'
import Featured from './Featured'
import Header from './Header'



export default class HomeScreen extends React.Component {
  render() {
    return (
        <View style={styles.container}>
        <Header/>
        <Featured/>
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