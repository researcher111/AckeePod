import * as React from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

export default class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
           <TouchableOpacity onPress={()=>{this.props.navigation.toggleDrawer()}}>
                <Image style={styles.menuIcon} source={require('../assets/menuIcon.png')}/>
            </TouchableOpacity>
                <Text style={styles.title}> Featured</Text>
                <Image style={styles.searchIcon} source={require('../assets/searchIcon.png')} />
            </View>
        )
    }

}



const styles = StyleSheet.create(
    {
        container:{
            height: 48,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'

        },

        title:{
            letterSpacing: 0.4,
            textAlign: 'left',
            fontSize: 40,
            color: "#ffffff",
        },
        searchIcon:{
            margin:10
        },
        menuIcon:{
            width: 30,
            height: 30,
        }
        
    }
)