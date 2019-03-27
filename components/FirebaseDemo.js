/***
 * This component is intented to Demostrate firebase integration in expo
 */

import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "<YOUR-API-KEY>",
    authDomain: "<YOUR-AUTH-DOMAIN>",
    databaseURL: "<YOUR-DATABASE-URL>",
    storageBucket: "<YOUR-STORAGE-BUCKET>"
  };

export default class FirebaseDemo extends React.Component{


constructor(props){
    super(props)
    this.setState ={
        databaseUpdate: ""
    }

}

componentDidMount(){
    firebase.initializeApp(firebaseConfig);
}


 storeHighScore(podCastId, imageURL) {
    firebase.database().ref('podCasts/' + podCastId).set({
      imageURL: imageURL
    })
  }


  setupHighscoreListener(userId) {
     let currentState = this.state 
    firebase.database().ref('podCasts/' + userId).on('value', (snapshot) => {
      const imageURL = snapshot.val().imageURL;
      console.log("image URL is : " + imageURL);
        currentState.setState({
            databaseUpdate: imageURL
        })

    });
  }


  render(){
      <View styles ={styles.container}>
          <Text> {this.state.databaseUpdate}</Text>
      </View>
  }

}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection:'column',
            paddingTop: Constants.statusBarHeight,

        }
    }
)



