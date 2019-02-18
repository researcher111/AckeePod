import React from 'react'
import {View, Text} from 'react-native'


export default class PlayerScreen extends React.Component{
    constructor(props){
        super(props)
        var {navigation} = this.props
        this.state = {
            podID: navigation.getParam('pod', '0')
        }
    }


    render(){
        return(
            <View style={ {flex: 1, justifyContent: 'center', alignItem:'center'} } >
                <Text>Detail Screen {this.state.podID} </Text>  
            </View>
        )
    }

    componentWillUnmount(){
        console.log("UnMounted")
    }

}