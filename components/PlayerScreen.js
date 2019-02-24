import React from 'react'
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {Audio} from 'expo'

export default class PlayerScreen extends React.Component{
    constructor(props){
        super(props)
        var {navigation} = this.props
        this.state = {
            podID: navigation.getParam('pod', '0'), 
            isPlaying: false
        }
    }

    componentDidMount(){
        const soundObject = new Audio.Sound()
        soundObject.loadAsync(require("../assets/tunes3.mp3")).then(
            this.setState({
                soundLoaded: true,
                soundObject: soundObject
            })
        )
    }

    async toggleSound(){
        if(this.state.soundLoaded && !this.state.isPlaying){
            try {
                    await this.state.soundObject.playAsync();
                    this.setState({
                        isPlaying: true
                    })
                } catch (error) {
                    console.log("error with sound")
                }
        }else{
            try {
                await this.state.soundObject.pauseAsync();
                this.setState({
                    isPlaying: false
                })
            } catch (error) {
                console.log("error with sound")
            }
        }
    
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={ styles.container} >
                   
                    {!this.state.isPlaying ? (
                         <TouchableOpacity
                         onPress={
                             ()=>{this.toggleSound()}
                         }
                         >
                        <Image 
                        source={require('../assets/playButton.png')} />
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity
                         onPress={
                             ()=>{this.toggleSound()}
                         }
                         >
                        <Image 
                        source={require('../assets/pauseButton.png')} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
    componentWillUnmount(){
        console.log("UnMounted")
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: "#000D0C",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'

    },
    ControlContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    }
})