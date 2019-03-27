import React from 'react'
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native'
import {Audio} from 'expo'
import Slider from "react-native-slider";


export default class PlayerScreen extends React.Component{
    constructor(props){
        super(props)
        var {navigation} = this.props
        this.state = {
            podID: navigation.getParam('pod', '0'), 
            image: "https://www.cs.virginia.edu/~dgg6b/Mobile/Images/PodCastImage3.png",
            title: "Another Great Piece",
            subTitle: "Written by freeMusicArchive.org",
            soundLoaded: false,
        }
    }

    componentDidMount(){
        const soundObject = new Audio.Sound()
        soundObject.loadAsync(require("../assets/tunes2.mp3")).then( ()=>{
            this.setState({
                soundLoaded: true,
                soundObject: soundObject,
                soundObjectStatus: JSON.parse(soundObject._lastStatusUpdate)
            })
            soundObject.setOnPlaybackStatusUpdate(()=>{this.onPlaybackStatusUpdate()})
        })
    }

     onPlaybackStatusUpdate(){
        this.setState({
            soundObjectStatus: JSON.parse(this.state.soundObject._lastStatusUpdate)
        })
    }

    async rewind(time){
        try {
            await this.state.soundObject.setPositionAsync(this.state.soundObjectStatus.positionMillis - time)
        }catch(err){
            console.log(err)
        }
    }
 
    async toggleSound(){
        if(this.state.soundObjectStatus === null || this.state.soundLoaded && !this.state.soundObjectStatus.isPlaying){
            try {
                    if(this.state.soundObjectStatus !== null && this.state.soundObjectStatus.didJustFinish){
                        await this.state.soundObject.setPositionAsync(0)
                        await this.state.soundObject.playAsync()
                    }else{
                        await this.state.soundObject.playAsync()
                    }    
                } catch (error) {
                    console.log("error with sound")
                }
        }else{
            try {
                await this.state.soundObject.pauseAsync();
            } catch (error) {
                console.log("error with sound")
            }
        }
    }


    render(){
       
       

        return(
            <View style={styles.container}>
                <Image
                style={styles.featurePlayerImage}
                 source={{uri: this.state.image}} />
              
              { this.state.soundLoaded && this.state.soundObjectStatus !== null ?(
                  <View> 
                    <Slider  
                        style={styles.slider}
                        value = {this.state.soundObjectStatus.positionMillis/1000}
                        maximumValue = {this.state.soundObjectStatus.durationMillis/1000}
                        minimumTrackTintColor = "#FFF"
                        thumbTintColor = "#FFF"
                        minimumValue ={0}
                    />
                    <View style={styles.sliderContainer} style={{paddingTop: 10, flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={{color: "#fff"}}> {this.state.soundObjectStatus.positionMillis/1000}</Text> 
                        <Text style={{color: "#fff"}}> {this.state.soundObjectStatus.durationMillis/1000}</Text> 
                    </View> 
                </View> 
                ):
                (
                    <Slider  
                    style={styles.slider}
                    value = {0}
                    maximumValue = {10}
                    minimumTrackTintColor = "#FFF"
                    thumbTintColor = "#FFF"
                    minimumValue ={0}
                />
                )
                }
            <View>
                <Text style={styles.title}> {this.state.title}</Text>
                <Text style={styles.subTitle}> {this.state.subTitle}</Text>
            </View>

                {  this.state.soundLoaded ? (
                    <View style={ styles.controlContainer} >
                        <TouchableOpacity onPress={() =>{this.rewind(15000)}} >
                            <Image source={require('../assets/Backward15.png')} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={ ()=>{this.toggleSound()}}>
                            
                        {this.state.soundObjectStatus === null || !this.state.soundObjectStatus.isPlaying? (
                            <Image 
                            source={require('../assets/playButton.png')} />
                        ):(
                        
                            <Image 
                            source={require('../assets/pauseButton.png')} />
                        )}
                        </TouchableOpacity>
                            <TouchableOpacity onPress={() =>{this.rewind(-15000)}} >
                                <Image 
                                    source={require('../assets/Forward15.png')} />
                        </TouchableOpacity>
                        </View>
                    ):(<View/>)
                    }
                
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
        justifyContent: 'space-evenly',
        alignItems:'center'

    },
    subTitle:{
        color: "#D8D8D8"
    },
    title:{
        fontSize: 22,
        color: "#FFFFFF"
    },
    featurePlayerImage:{
        width: 315, 
        height: 315,
    },
    slider:{
        width: 315, 
        height: 5,
    },

    controlContainer:{
        width: 250, 
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})