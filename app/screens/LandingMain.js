import React from 'react';
import {Text, View, Dimensions, TouchableOpacity,Image} from 'react-native';

export default class LandingMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {width, height} = Dimensions.get('window');

    return (
      <View
        style={{width, height, justifyContent: 'center', alignItems: 'center'}}>
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
        <TouchableOpacity
            onPress={()=>{
                this.props.navigation.navigate('UploadData')
            }}
          style={{
            backgroundColor: 'blue',
            padding: 20,
            width: width * 0.6,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            START
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
