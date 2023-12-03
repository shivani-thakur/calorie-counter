import React from 'react';
import {Text,View,Dimensions,ActivityIndicator,Image} from 'react-native';

export default class Splash extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.navigate("Landing")
        },1500)
    }

    render(){
        const {width,height} = Dimensions.get('window');
        return(
            <View style={{
                width,height,justifyContent:'center',alignItems:'center'
            }}>
                <View
          style={{
            position: 'absolute',
            top: 0,
            width,
            height,
            backgroundColor: 'pink',
            opacity: 0.2,
          }}>
          <Image source={require('./back2.png')} style={{width, height}}></Image>
        </View>
                <Text style={{
                    color:'black',
                    fontSize:24,
                    fontWeight:'bold',
                }}>Nutrition Counter</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        )
    }
}