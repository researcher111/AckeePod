import * as React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

export default class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.container}>
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

        },

        title:{
            letterSpacing: 0.4,
            textAlign: 'left',
            fontSize: 40,
            color: "#ffffff",
            fontFamily: 'Helvetica-Bold'
        },
        searchIcon:{
            margin:10
        }
        
    }
)