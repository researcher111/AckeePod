import * as React from 'react';
import { View , StyleSheet, Button} from 'react-native';

export default class LoginScreen extends React.Component {
    async handleFacebookLogin(navigation){
        try {
          const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '1201211719949057', // Replace with your own app id in standalone app
            { permissions: ['public_profile'] }
          )
    
          switch (type) {
            case 'success': {
              // Get the user's name using Facebook's Graph API
              const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
              const profile = await response.json();
              navigation.navigate('MainScreen', {profile})
               
              break;
            }
            case 'cancel': {
              Alert.alert(
                'Whoops!',
                'You need a facebook to access AckeePod:)',
              );
     
              break;
            }
            default: {
              Alert.alert(
                'Oops!',
                'Login failed!',
              );
            }
          }
        } catch (e) {
          console.log("Something unexpected happened")
        }
      };
    
  
  
   render() {

    return(<View style={styles.container}>
        <Button 
            title="Login with Facebook"
            onPress={()=>this.handleFacebookLogin(navigation)}
            />
        </View>)

  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1, 
    flexDirection: "column",
    alignItems: 'center', 
    justifyContent: 'center',

    }
})
