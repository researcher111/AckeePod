import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import { Constants } from 'expo'
import Featured from './Featured'
import Header from './Header'
import PodScrollView from './PodScrollView'


export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
  }

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
        <PodScrollView/>
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

