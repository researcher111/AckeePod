import * as React from 'react'
import {View, Text, StyleSheet,ImageBackground} from 'react-native'

export default class Featured extends React.Component{

 constructor(props){
     super(props)
     this.state={
         featured: null
     }
 }   

componentDidMount(){
    this.getData()
}

async getData(){
    let response = await fetch("https://www.cs.virginia.edu/~dgg6b/Mobile/Featured/featured.json")
    let parsedResponse = await response.json()
    console.log(parsedResponse)
    this.setState({
        featured : parsedResponse
    })
}

render(){
    if(this.state.featured === null){
        return(<View/>)
    }
    return(
        <View style={styles.container}>
        <ImageBackground style={styles.featuredImage}
        source={{uri: this.state.featured.image}}>
            <Text style={styles.title}> {this.state.featured.title}
             </Text>
            <Text style={styles.author}> {this.state.featured.author} 
            </Text>
        </ImageBackground>
        </View>
        )
    }
}
const styles = StyleSheet.create(
    {
        container:{
            height:158,
        },
        featuredImage:{
            height: 148,
            margin:10,
            flexDirection: 'column',
            justifyContent: 'flex-end',
        },
        title:{
            fontFamily: "Helvetica-Bold",
            fontSize: 20,
            color: "#FFFFFF",
            letterSpacing: 0.38,
            textAlign: "left",
        }, 
        author:{
            fontFamily: "Helvetica",
            fontSize: 16,
            color: "rgba(255,255,255,0.75)",
            textAlign: "left"
        }

       
    }
)