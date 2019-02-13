import * as React from 'react'
import {StyleSheet, Text, View, Image, FlatList} from 'react-native'
export default class PodScrollView extends React.Component{
    constructor(){
        super()
        this.state ={
            podCastList: null
        }
    }
    
    async getPodCastData(){
        let response = await fetch("https://www.cs.virginia.edu/~dgg6b/Mobile/PodCast/podCastList.json")
        let extractedJson = await response.json()
        this.setState({
            podCastList: extractedJson.podCastList
        })
    }

    componentWillMount(){
        this.getPodCastData()
    }
    

    keyExtractor(item){
        return item.id.toString()
    }

    renderRow({item}){
        console.log(item.row[0].image)
        return(
            <View style={styles.rowContainer}>
                <View style={styles.podCastContainer}>
                    <Image style={styles.podImages} source={{uri: item.row[0].image}}/>
                    <Text style={styles.podCastTile}>{item.row[0].title}</Text>
                </View> 
                <View style={styles.podCastContainer}>
                    <Image style={styles.podImages} source={{uri: item.row[1].image}}/>
                    <Text style={styles.podCastTile}>{item.row[0].title}</Text>
                </View> 
            </View>
        )
    }

    render(){
        if(this.state.podCastList !== null){
        return(
            <View style={styles.container}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}> My PodCast</Text>
                    <Image style={styles.dotdot} source={require('../assets/dotdot.png')}></Image>
                </View>
                 <FlatList
                    style={styles.ScollablePodCasts}
                    data={this.state.podCastList}
                    renderItem={this.renderRow}
                    keyExtractor={this.keyExtractor}
                />
                </View>
        )
        }else{
            return(<View style={{flex:1}}/>)
        }
    }
}

const styles = StyleSheet.create(
    {
        conatiner:{
            flex:1,
            flexDirection:'column',
            justifyContent: 'space-between',
            padding:20
        },
        titleSection:{
            height: 29,
            flexDirection:'row', 
            justifyContent: 'space-between',
            alignItems:'center'
        },

        title: {
            fontFamily: "Helvetica",
            fontSize: 24,
            color: "#FFFFFF",
            letterSpacing: 0.35,
            textAlign: "left",
        },

        dotdot:{
            paddingLeft: 10
        },

        ScollablePodCasts:{
            flex:0
            },

        rowContainer:{
            flexDirection:'row', 
            justifyContent: 'space-between',
            padding: 15
        },

        podCastContainer:{
            flexDirection:'column', 
            justifyContent: 'space-evenly',
        },

        podCastTile:{
            fontFamily: "Helvetica",
            fontSize: 14,
            color: "#FFFFFF",
            letterSpacing: -0.15,
            textAlign: "left",
            paddingTop: 10
        }, 

        podImages:{
            height: 128, 
            width: 128,
        }     

    }
)